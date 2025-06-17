import { Injectable, NotFoundException } from '@nestjs/common';
import { OasisHttpService } from '@oasis/oasis-common/oasis-http.service';
import { PaginatedOasisResponse } from '@oasis/oasis-common/interfaces/oasis-pagination.interface';
import { OASIS_INCIDENT_SELECT_FIELDS } from './oasis-incidents.constants';
import { OasisResourceService } from '@oasis/oasis-common/base-services/oasis-resource.service';
import { OasisContactsService } from '@oasis/oasis-resources/oasis-contacts/oasis-contacts.service';
import { OasisIncident } from './interfaces/oasis-incident.interface';
import { GetDemandesQueryParamsDTO } from 'src/external-resources/demandes/dtos/get-demandes-query-params.dto';
import {
  OasisCollectionResponse,
  OasisSingleResponse,
} from '@oasis/oasis-common/interfaces/oasis-response.interface';
import {
  GetPartnerProximityQueryParamsDTO,
  ProximityTarget,
} from 'src/external-resources/demandes/dtos';
import {
  OasisAccount,
  OasisAccountWithProximity,
} from '@oasis/oasis-resources/oasis-accounts/interfaces';
import { OasisContact } from '../oasis-contacts/interfaces/oasis-contact.interface';
import { OasisAccountsService } from '../oasis-accounts/oasis-accounts.service';
import { distanceTo, getBoundingBox } from 'geolocation-utils';

@Injectable()
export class OasisIncidentsService extends OasisResourceService {
  constructor(
    private readonly oasisHttpService: OasisHttpService,
    private readonly oasisContactsService: OasisContactsService,
    private readonly oasisAccountsService: OasisAccountsService,
  ) {
    super();
  }

  public async get(
    getIncidentsQueryParams?: GetDemandesQueryParamsDTO,
  ): Promise<PaginatedOasisResponse<OasisIncident>> {
    const { pageSize, paginationSessionId, direction, paramsString } =
      this.handleQueryParams(
        getIncidentsQueryParams ?? {},
        OASIS_INCIDENT_SELECT_FIELDS,
      );

    const endpoint = '/incidents';

    const response = await this.oasisHttpService.get<OasisIncident>(
      `${endpoint}${paramsString}`,
      pageSize,
      paginationSessionId,
      direction,
    );
    return response;
  }

  public async getOne(
    id: string,
  ): Promise<PaginatedOasisResponse<OasisIncident>> {
    const endpoint = `/incidents(${id})`;

    const paramsString = `?$select=${OASIS_INCIDENT_SELECT_FIELDS.join(',')}`;

    const response = await this.oasisHttpService.get<OasisIncident>(
      `${endpoint}${paramsString}`,
    );

    return response;
  }

  public async getPartnerProximity(
    demandeId: string,
    getPartnerProximityQueryParams: GetPartnerProximityQueryParamsDTO,
  ): Promise<PaginatedOasisResponse<OasisAccountWithProximity>> {
    const incidentId = demandeId;

    const { proximityTarget } = getPartnerProximityQueryParams;

    const incident = (await this.getOne(incidentId))
      .data as OasisSingleResponse<OasisIncident>;

    if (!incident) {
      throw new NotFoundException('Incident not found');
    }

    const { _customerid_value: contactId } = incident;

    if (!contactId) {
      throw new NotFoundException('Incident has no associated contact ID');
    }

    let latitude: number | null = null;
    let longitude: number | null = null;

    if (proximityTarget === ProximityTarget.MISSION) {
      const {
        cap_adresse_latitude: latMission,
        cap_adresse_longitude: longMission,
      } = incident;

      if (!latMission || !longMission) {
        throw new NotFoundException(
          'Incident has no associated mission geoloc',
        );
      }

      latitude = latMission;
      longitude = longMission;
    }

    const contact = (await this.oasisContactsService.getContact(contactId))
      .data as OasisSingleResponse<OasisContact>;

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    const {
      address1_latitude: latContact,
      address1_longitude: longContact,
      address1_postalcode: postalCodeContact,
    } = contact;

    if (!latContact || !longContact) {
      throw new NotFoundException('Contact has no associated geoloc');
    }

    if (!postalCodeContact) {
      throw new NotFoundException('Contact has no associated postal code');
    }

    if (proximityTarget === ProximityTarget.DOMICILE) {
      latitude = latContact;
      longitude = longContact;
    }

    if (!latitude || !longitude) {
      throw new NotFoundException('Centre point not determinable');
    }

    const centrePoint = { latitude, longitude };
    const initialBoxMarginMetres = 1500;
    const maxBoxMarginMetres = 12000;
    const minRequiredPartners = 3;

    return this._findPartnersWithProximity(
      centrePoint,
      initialBoxMarginMetres,
      maxBoxMarginMetres,
      minRequiredPartners,
      postalCodeContact,
      proximityTarget,
      getPartnerProximityQueryParams,
    );
  }

  private async _findPartnersWithProximity(
    centrePoint: { latitude: number; longitude: number },
    currentBoxMarginMetres: number,
    maxBoxMarginMetres: number,
    minRequiredPartners: number,
    postalCodeContact: string,
    proximityTarget: ProximityTarget,
    getPartnerProximityQueryParams: GetPartnerProximityQueryParamsDTO,
  ): Promise<PaginatedOasisResponse<OasisAccountWithProximity>> {
    const partnersInBoundingBox = await this._getPartnersInBoundingBox(
      centrePoint,
      currentBoxMarginMetres,
      getPartnerProximityQueryParams,
    );

    const partners =
      partnersInBoundingBox.data as OasisCollectionResponse<OasisAccount>;

    if (!partners?.value?.length) {
      if (currentBoxMarginMetres > maxBoxMarginMetres) {
        return partnersInBoundingBox as PaginatedOasisResponse<OasisAccountWithProximity>;
      }
      return this._findPartnersWithProximity(
        centrePoint,
        currentBoxMarginMetres * 2,
        maxBoxMarginMetres,
        minRequiredPartners,
        postalCodeContact,
        proximityTarget,
        getPartnerProximityQueryParams,
      );
    }

    const validPartners = this._classifyValidPartners(
      centrePoint,
      partners,
      postalCodeContact,
      proximityTarget,
    );

    if (
      validPartners.length < minRequiredPartners &&
      currentBoxMarginMetres <= maxBoxMarginMetres
    ) {
      return this._findPartnersWithProximity(
        centrePoint,
        currentBoxMarginMetres * 2,
        maxBoxMarginMetres,
        minRequiredPartners,
        postalCodeContact,
        proximityTarget,
        getPartnerProximityQueryParams,
      );
    }

    return {
      ...partnersInBoundingBox,
      data: {
        ...partnersInBoundingBox.data,
        value: validPartners,
      },
    } as PaginatedOasisResponse<OasisAccountWithProximity>;
  }

  // NB: we don't want to accept a location array here, even though the geoloc library could handle it. This ensure we only ever calculate the bounding box around a single point.
  private async _getPartnersInBoundingBox(
    centrePoint: { latitude: number; longitude: number },
    marginMetres: number,
    getPartnerProximityQueryParams: GetPartnerProximityQueryParamsDTO,
  ) {
    const boundingBox = getBoundingBox([centrePoint], marginMetres);

    const partners = await this.oasisAccountsService.getInBoundingBox(
      boundingBox,
      getPartnerProximityQueryParams,
    );

    return partners;
  }

  private _classifyValidPartners(
    centrePoint: { latitude: number; longitude: number },
    partners: OasisCollectionResponse<OasisAccount>,
    postalCodeContact: string,
    proximityTarget: ProximityTarget,
  ) {
    const classifiedPartners = partners.value.flatMap((partner) => {
      // Exclude partners not in the same department
      const { address1_postalcode: postalCodePartner } = partner;
      if (postalCodePartner.slice(0, 2) !== postalCodeContact.slice(0, 2)) {
        return [];
      }

      // Exclude partners without geoloc
      const { address1_latitude: latPartner, address1_longitude: longPartner } =
        partner;

      if (!latPartner || !longPartner) {
        return [];
      }

      // Calculate distance between contact and partner
      const distance = distanceTo(
        { lat: centrePoint.latitude, lon: centrePoint.longitude },
        { lat: latPartner, lon: longPartner },
      );
      // round to integer
      return {
        ...partner,
        proximity: Math.round(distance),
        proximityTarget,
      };
    });

    const sortedClassifiedPartners = classifiedPartners.sort((a, b) => {
      return a.proximity - b.proximity;
    });

    return sortedClassifiedPartners;
  }
}
