import { Injectable } from '@nestjs/common';
import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import { QueryParamComponent } from 'src/external-resources/common/types/query-param-component.type';

@Injectable()
export abstract class OasisResourceService {
  constructor() {}

  protected handleQueryParams<T extends BaseExternalResourceQueryParamsDTO>(
    queryParams: T,
    selectFields: readonly string[],
  ): {
    pageSize?: number;
    paginationSessionId?: string;
    direction?: 'next' | 'prev';
    paramsString?: string;
  } {
    const { pageSize, paginationSessionId, direction, ...params } = queryParams;

    const paramsComponents = Object.values(params).filter(
      (param) => param !== undefined,
    ) as QueryParamComponent<string>[];

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
    paramsComponents: QueryParamComponent<string>[],
    selectFields: readonly string[],
  ): string {
    let orderbyString = '';
    let filterString = '';
    let searchString = '';

    // Separate param components by type
    const orderbyComponents = paramsComponents.filter(
      (component) => component.type === 'orderby',
    );
    const filterComponents = paramsComponents.filter(
      (component) => component.type === 'filter',
    );
    const searchComponents = paramsComponents.filter(
      (component) => component.type === 'search',
    );

    // Build orderby string
    // e.g. $orderby=name asc,city asc
    if (orderbyComponents.length > 0) {
      orderbyString = `$orderby=${orderbyComponents.map((component) => `${component.target} ${component.value}`).join(',')}`;
    }

    // Build filters substring
    // TODO test for string / number filter values
    // (filters and searches components get combined into $filter)
    // filter e.g. `name eq 'John' and code eq 123`
    if (filterComponents.length > 0) {
      filterString = `${filterComponents.map((component) => `${component.target} eq ${component.value}`).join(' and ')}`;
    }

    // Build searches substring
    // (searches and filterscomponents get combined into $filter)
    // search e.g. `contains(name, 'John') and contains(city, 'Paris')`
    if (searchComponents.length > 0) {
      searchString = `contains(${searchComponents.map((component) => `${component.target}, '${component.value}')`).join(' and contains(')}`;
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
}
