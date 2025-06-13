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
import { GetPartnerProximityQueryParamsDTO } from 'src/external-resources/demandes/dtos/get-partner-proximity-query-params.dto';
import { OasisAccount } from '@oasis/oasis-resources/oasis-accounts/interfaces';
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
  ): Promise<PaginatedOasisResponse<OasisAccount & { distance: number }>> {
    const incidentId = demandeId;

    const { missionCentered, partnerType } = getPartnerProximityQueryParams;

    const incident = (await this.getOne(incidentId))
      .data as OasisSingleResponse<OasisIncident>;

    if (!incident) {
      throw new NotFoundException('Incident not found');
    }

    const { _customerid_value: contactId } = incident;

    if (!contactId) {
      throw new NotFoundException('Incident has no associated contact ID');
    }

    if (missionCentered) {
      const {
        cap_adresse_latitude: latMission,
        cap_adresse_longitude: longMission,
      } = incident;

      if (!latMission || !longMission) {
        throw new NotFoundException(
          'Incident has no associated mission geoloc',
        );
      }
      // TODO: call partners service with mission lat/long params + partner type
    }

    const contact = (await this.oasisContactsService.getContact(contactId))
      .data as OasisSingleResponse<OasisContact>;

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    const { address1_latitude: latContact, address1_longitude: longContact } =
      contact;

    if (!latContact || !longContact) {
      throw new NotFoundException('Contact has no associated geoloc');
    }

    const boxMarginMetres = 2500;

    const partnersInBoundingBox = await this._getPartnersInBoundingBox(
      latContact,
      longContact,
      boxMarginMetres,
    );

    // TODO add params for geoloc and partner type / category
    // const partnersResponse = await this.oasisAccountsService.get();

    const partners =
      partnersInBoundingBox.data as OasisCollectionResponse<OasisAccount>;

    if (!partners?.value?.length) {
      // TODO: up the bounding box and search again
      return partnersInBoundingBox as PaginatedOasisResponse<
        OasisAccount & { distance: number }
      >;
    }

    const partnersWithDistance = partners.value.map((partner: OasisAccount) => {
      const { address1_latitude: latPartner, address1_longitude: longPartner } =
        partner;

      if (!latPartner || !longPartner) {
        return partner;
      }

      const distance = distanceTo(
        { lat: latContact, lon: longContact },
        { lat: latPartner, lon: longPartner },
      );
      // round to integer
      return { ...partner, distance: Math.round(distance) };
    });

    const partnersWithDistanceResponse = {
      ...partnersInBoundingBox,
      data: {
        ...partnersInBoundingBox.data,
        value: partnersWithDistance,
      },
    };

    return partnersWithDistanceResponse as PaginatedOasisResponse<
      OasisAccount & { distance: number }
    >;

    // TODO: update partners to return lat / long
    // TODO: call partners service with contact lat/long params + partner type
    // TODO: private method for distance calculation
    // TODO: return partners with distance
  }

  private async _getPartnersInBoundingBox(
    lat: number,
    lon: number,
    marginMetres: number,
  ) {
    const boundingBox = getBoundingBox(
      [{ latitude: lat, longitude: lon }],
      marginMetres,
    );

    const partners =
      await this.oasisAccountsService.getInBoundingBox(boundingBox);

    return partners;
  }
}
