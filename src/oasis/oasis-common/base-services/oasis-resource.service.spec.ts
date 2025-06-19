import { Test, TestingModule } from '@nestjs/testing';
import { OasisResourceService } from './oasis-resource.service';
import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import { QueryParamComponent } from 'src/external-resources/common/types/query-param-component.type';

// Create a concrete implementation of the abstract class for testing
class TestOasisResourceService extends OasisResourceService {
  // Expose protected methods for testing
  public testBuildParamsString(
    paramsComponents: QueryParamComponent<unknown>[],
    selectFields: readonly string[],
  ): string {
    return this['_buildParamsString'](paramsComponents, selectFields);
  }

  public testValidateGuid(guid: string): boolean {
    return this['_validateGuid'](guid);
  }

  public testHandleQueryParams<T extends BaseExternalResourceQueryParamsDTO>(
    domainQueryParams: T,
    selectFields: readonly string[],
  ) {
    return this.handleQueryParams(domainQueryParams, selectFields);
  }

  public testExtractGuidFromODataUrl(url: string): string {
    return this.extractGuidFromODataUrl(url);
  }
}

describe('OasisResourceService', () => {
  let service: TestOasisResourceService;
  const selectFields = ['id', 'name', 'email'] as const;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestOasisResourceService],
    }).compile();

    service = module.get<TestOasisResourceService>(TestOasisResourceService);
  });

  describe('handleQueryParams', () => {
    it('should handle basic domain query parameters correctly', () => {
      const domainQueryParams: BaseExternalResourceQueryParamsDTO = {
        pageSize: 10,
        paginationSessionId: 'test-session',
        direction: 'next',
      };

      const result = service.testHandleQueryParams(
        domainQueryParams,
        selectFields,
      );

      expect(result).toEqual({
        pageSize: 10,
        paginationSessionId: 'test-session',
        direction: 'next',
        paramsString: '?$select=id,name,email&$count=true',
      });
    });

    it('should handle empty domain query parameters', () => {
      const domainQueryParams: BaseExternalResourceQueryParamsDTO = {};
      const result = service.testHandleQueryParams(
        domainQueryParams,
        selectFields,
      );

      expect(result).toEqual({
        paramsString: '?$select=id,name,email&$count=true',
      });
    });
  });

  describe('_buildParamsString', () => {
    it('should build correct orderby string', () => {
      const paramsComponents: QueryParamComponent<string>[] = [
        { type: 'orderby', target: 'name', value: 'asc' },
        { type: 'orderby', target: 'email', value: 'desc' },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        '?$select=id,name,email&$orderby=name asc,email desc&$count=true',
      );
    });

    it('should build correct filter string', () => {
      const paramsComponents: QueryParamComponent<string>[] = [
        { type: 'filter', target: 'name', value: "'John'" },
        { type: 'filter', target: 'id', value: '25' },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        "?$select=id,name,email&$filter=name eq 'John' and id eq 25&$count=true",
      );
    });

    it('should build correct filter string for array values', () => {
      const paramsComponents: QueryParamComponent<unknown>[] = [
        { type: 'filter', target: 'id', value: [1, 2, 3] },
        { type: 'filter', target: 'name', value: 'John' },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        '?$select=id,name,email&$filter=(id eq 1 or id eq 2 or id eq 3) and name eq John&$count=true',
      );
    });

    it('should build correct filter string for array values with single value', () => {
      const paramsComponents: QueryParamComponent<unknown>[] = [
        { type: 'filter', target: 'id', value: [1] },
        { type: 'filter', target: 'name', value: 'John' },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        '?$select=id,name,email&$filter=(id eq 1) and name eq John&$count=true',
      );
    });

    it('should build correct search string', () => {
      const paramsComponents: QueryParamComponent<string>[] = [
        { type: 'search', target: 'name', value: 'John' },
        { type: 'search', target: 'email', value: 'example.com' },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        "?$select=id,name,email&$filter=contains(name, 'John') and contains(email, 'example.com')&$count=true",
      );
    });

    it('should combine filter and search strings correctly', () => {
      const paramsComponents: QueryParamComponent<string>[] = [
        { type: 'filter', target: 'id', value: '25' },
        { type: 'search', target: 'name', value: 'John' },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        "?$select=id,name,email&$filter=id eq 25 and contains(name, 'John')&$count=true",
      );
    });

    it('should handle empty arrays of components', () => {
      const paramsComponents: QueryParamComponent<string>[] = [];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe('?$select=id,name,email&$count=true');
    });

    it('should handle undefined values in components', () => {
      const paramsComponents: QueryParamComponent<string>[] = [
        { type: 'filter', target: 'name', value: '' },
        { type: 'search', target: 'email', value: 'example.com' },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        "?$select=id,name,email&$filter=contains(email, 'example.com')&$count=true",
      );
    });
  });

  describe('extractGuidFromODataUrl', () => {
    it('should extract valid GUID from OData URL', () => {
      const url =
        'https://fasttrecette.crm4.dynamics.com/api/data/v9.2/accounts(9a702436-083b-f011-b4cc-7c1e5275f0e9)';
      const result = service.testExtractGuidFromODataUrl(url);
      expect(result).toBe('9a702436-083b-f011-b4cc-7c1e5275f0e9');
    });

    it('should return empty string for invalid URL format', () => {
      const url = 'https://invalid-url.com';
      const result = service.testExtractGuidFromODataUrl(url);
      expect(result).toBe('');
    });

    it('should return empty string for invalid GUID format', () => {
      const url =
        'https://fasttrecette.crm4.dynamics.com/api/data/v9.2/accounts(invalid-guid)';
      const result = service.testExtractGuidFromODataUrl(url);
      expect(result).toBe('');
    });

    it('should handle URLs with multiple parentheses', () => {
      const url =
        'https://fasttrecette.crm4.dynamics.com/api/data/v9.2/accounts(9a702436-083b-f011-b4cc-7c1e5275f0e9)/related(123)';
      const result = service.testExtractGuidFromODataUrl(url);
      expect(result).toBe('');
    });
  });

  describe('_validateGuid', () => {
    it('should validate correct GUID format', () => {
      const validGuid = '9a702436-083b-f011-b4cc-7c1e5275f0e9';
      expect(service.testValidateGuid(validGuid)).toBe(true);
    });

    it('should reject invalid GUID format', () => {
      const invalidGuids = [
        'invalid-guid',
        '9a702436-083b-f011-b4cc',
        '9a702436-083b-f011-b4cc-7c1e5275f0e9-extra',
        '9a702436-083b-f011-b4cc-7c1e5275f0e',
        '9a702436-083b-f011-b4cc-7c1e5275f0e9g', // Invalid character
      ];

      invalidGuids.forEach((guid) => {
        expect(service.testValidateGuid(guid)).toBe(false);
      });
    });
  });

  // Edge cases and potential issues
  describe('Edge Cases', () => {
    it('should handle special characters in search values', () => {
      const paramsComponents: QueryParamComponent<string>[] = [
        {
          type: 'search',
          target: 'name',
          value: 'CITROEN RENT & SMILE - AUTO TECHNIQ',
        },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        "?$select=id,name,email&$filter=contains(name, 'CITROEN RENT & SMILE - AUTO TECHNIQ')&$count=true",
      );
    });

    it('should handle special single quotes in search values', () => {
      const paramsComponents: QueryParamComponent<string>[] = [
        {
          type: 'search',
          target: 'name',
          value: "CROIX-D'EAU",
        },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        "?$select=id,name,email&$filter=contains(name, 'CROIX-D''EAU')&$count=true",
      );
    });

    it('should handle multiple spaces in values', () => {
      const paramsComponents: QueryParamComponent<string>[] = [
        {
          type: 'filter',
          target: 'name',
          value: "'John  Smith'",
        },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        "?$select=id,name,email&$filter=name eq 'John  Smith'&$count=true",
      );
    });

    it('should handle empty strings in values', () => {
      const paramsComponents: QueryParamComponent<string>[] = [
        {
          type: 'filter',
          target: 'name',
          value: "''",
        },
      ];

      const result = service.testBuildParamsString(
        paramsComponents,
        selectFields,
      );

      expect(result).toBe(
        "?$select=id,name,email&$filter=name eq ''&$count=true",
      );
    });
  });
});
