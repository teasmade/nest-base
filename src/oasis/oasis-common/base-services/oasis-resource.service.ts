import { Injectable, Logger } from '@nestjs/common';
import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import {
  QueryParamComponent,
  QueryParamComponentType,
} from 'src/external-resources/common/types/query-param-component.type';

const VALID_QUERY_PARAM_COMPONENT_TYPES: QueryParamComponentType[] = [
  'filter',
  'search',
  'orderby',
];

@Injectable()
export abstract class OasisResourceService {
  private readonly logger = new Logger(OasisResourceService.name);

  constructor() {}

  protected handleQueryParams<T extends BaseExternalResourceQueryParamsDTO>(
    domainQueryParams: T,
    selectFields: readonly string[],
  ): {
    pageSize?: number;
    paginationSessionId?: string;
    direction?: 'next' | 'prev';
    paramsString?: string;
  } {
    const { pageSize, paginationSessionId, direction, ...otherDomainParams } =
      domainQueryParams;

    const paramsComponents = Object.values(otherDomainParams).filter(
      (param) => param !== undefined,
    ) as QueryParamComponent<unknown>[];

    const paramsString = this._buildParamsString(
      paramsComponents,
      selectFields,
    );

    return {
      pageSize: pageSize,
      paginationSessionId: paginationSessionId,
      direction: direction,
      paramsString: paramsString,
    };
  }

  private _buildParamsString(
    paramsComponents: QueryParamComponent<unknown>[],
    selectFields: readonly string[],
  ): string {
    console.log('paramsComponents', paramsComponents);
    let orderbyString = '';
    let filterString = '';
    let searchString = '';

    const validComponents = this._filterValidParamsComponents(
      paramsComponents,
      selectFields,
    );

    // Separate param components by type
    const orderbyComponents = validComponents.filter(
      (component) => component.type === 'orderby',
    );
    const filterComponents = validComponents.filter(
      (component) => component.type === 'filter',
    );
    const searchComponents = validComponents.filter(
      (component) => component.type === 'search',
    );

    // Build orderby string
    // e.g. $orderby=name asc,city asc
    if (orderbyComponents.length > 0) {
      orderbyString = `$orderby=${orderbyComponents.map((component) => `${component.target} ${component.value as string}`).join(',')}`;
    }

    // Build filters substring
    // TODO test for string / number filter values
    // (filters and searches components get combined into $filter)
    // filter e.g. `name eq 'John' and code eq 123`
    if (filterComponents.length > 0) {
      filterString = filterComponents
        .map((component) => {
          if (Array.isArray(component.value)) {
            // For arrays, create OR conditions: (target eq value1 or target eq value2)
            const orConditions = component.value
              .map((value) => `${component.target} eq ${value}`)
              .join(' or ');
            return `(${orConditions})`;
          } else {
            // For single values, use simple equality
            return `${component.target} eq ${component.value as string}`;
          }
        })
        .join(' and ');
    }

    // Build searches substring
    // (searches and filterscomponents get combined into $filter)
    // search e.g. `contains(name, 'John') and contains(city, 'Paris')`
    // NOTE: single quotes need to be escaped with double single quotes e.g. "CROIX-D'EAU" -> "CROIX-D''EAU"
    if (searchComponents.length > 0) {
      searchString = `contains(${searchComponents.map((component) => `${component.target}, '${(component.value as string).replace(/'/g, "''")}')`).join(' and contains(')}`;
    }

    // Build final $filter string combining filters and searches
    const combinedFilterString = [filterString, searchString]
      .filter(Boolean)
      .join(' and ');

    let finalFilterString = '';
    if (combinedFilterString.length > 0) {
      finalFilterString = `$filter=${combinedFilterString}`;
    }

    // Build select string
    const selectString = `$select=${selectFields.join(',')}`;

    // Build count string
    const countString = `$count=true`;

    // Concatenate all strings into a single params string
    const paramsString = [
      selectString,
      finalFilterString,
      orderbyString,
      countString,
    ]
      .filter(Boolean)
      .join('&');

    // Return final params string with ? if not empty
    if (paramsString.length > 0) {
      return `?${paramsString}`;
    }

    return paramsString;
  }

  private _filterValidParamsComponents(
    paramsComponents: QueryParamComponent<unknown>[],
    selectFields: readonly string[],
  ): QueryParamComponent<unknown>[] {
    return paramsComponents.filter(
      (component) =>
        selectFields.includes(component.target) &&
        component.value !== undefined &&
        component.value !== '' &&
        VALID_QUERY_PARAM_COMPONENT_TYPES.includes(component.type),
    );
  }

  private _validateGuid(guid: string): boolean {
    // Standard GUID format: 8-4-4-4-12 hexadecimal characters
    const guidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return guidRegex.test(guid);
  }

  /**
   * Extracts the GUID from an OData response URL
   * @param responseUrl - The OData response URL containing the GUID
   * @returns The extracted GUID, or empty string if extraction fails
   * @example
   * // Input: "https://fasttrecette.crm4.dynamics.com/api/data/v9.2/accounts(9a702436-083b-f011-b4cc-7c1e5275f0e9)"
   * // Output: "9a702436-083b-f011-b4cc-7c1e5275f0e9"
   */
  protected extractGuidFromODataUrl(responseUrl: string): string {
    try {
      const parts = responseUrl.split('(');
      if (parts.length !== 2) {
        this.logger.warn(`Invalid OData response URL format: ${responseUrl}`);
        return '';
      }

      const guidPart = parts[1].split(')')[0];
      if (!guidPart || !this._validateGuid(guidPart)) {
        this.logger.warn(
          `Invalid GUID format in OData response URL: ${responseUrl}`,
        );
        return '';
      }

      return guidPart;
    } catch (error) {
      this.logger.error(
        `Failed to extract GUID from OData response URL: ${responseUrl}`,
        error,
      );
      return '';
    }
  }
}
