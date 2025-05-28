# OASIS (external) API connection features

## Overview

The external OASIS API returns MS Dynamics OData results. We want to use a small subset of these in our business logic, and provide this data to our frontend client with a cleaner set of field names. NestJS allows us to keep the different steps of this process clearly encapsulated, and allows useful patterns notably via the class-transformer dependency to clearly define and automate inclusion / exclusion / name mapping of data fields.

## Implementation Process

The process for putting in place a new feature of this kind, using an initial GET route, follows.

Example files are provided illulstrating the process getting / mapping / transforming a subset of OASIS "accounts" to a "partner" module providing this data to the client.

**In the Oasis Module**

- The Oasis module is already set up to handle authentication, header params, http requests, pagination.
- We just need to create a new oasis-service folder in the Oasis module
  - Example: `src/oasis/oasis-accounts`
- Create an oasis-feature-interface which defines the raw results we will request from the Oasis API. This should include the OData expanded (e.g. formatted) fields we expect to receive.
  - Example: `src/oasis/oasis-accounts/interfaces/oasis-account.interface.ts`
- Create an oasis-feature-constants which defines the fields we will request from Oasis via the select query param. This should not include OData expanded fields.
  - Example `src/oasis/oasis-contacts/oasis-accounts.constants.ts`
- There is some additional typing in the interface and constant files in order to create an assertion that the keys of the interface (minus the OData keys) are the same as the values in the select fields array.
- Create an oasis-service to query the data from Oasis
  - Example: `src/oasis/oasis-accounts/oasis-accounts.service.ts`

**Making a New Feature Module**

- Create a new top level module which will transform the Oasis results and expose an endpoint to the front
  - Example: `src/partners` (A subset of Oasis "accounts" will be presented as "partners" to the client)
- Create a new controller with a GET route for the dataset in the new module
  - Example: `src/partners/partners.controller.ts`
- Create a new service and service get method in the new module
  - Example: `src/partners/partners.service.ts`
- Create a response DTO and a oasis-object-to-our-object DTO; these should use the class-transformer `@Expose` / `@Exclude` decorators, and the transformation (oasis-a-to-b) DTO should use the name option on `@Expose` to provide aliases for the keys we want to provide to our client
  - Example: `src/partners/dtos/partners-response-dto.ts` and `src/partners/dtos/oasis-account-to-partner.dto.ts`
- The service get method should return an instance of the response DTO, which wraps / references the transformation DTO
- The new controller should use the `@UseInterceptors(ClassSerializerInterceptor)` decorator on the class to ensure that class-transformer handles the transformations defined in the DTOs correctly

**Notes on DTO Typing**

- Transformation (oasis-a-to-b) dtos should fully implement the relevant oasis-feature-interface - e.g. `OasisAccountToPartnerDto implements Required<OasisAccount>` - this will give us type safety when writing the transformation dto and ensure all fields are present (either excluded or exposed).
  - Example: `src/partners/dtos/oasis-account-to-partner.dto.ts` implements `src/oasis/oasis-accounts/interfaces/oasis-account.interface.ts`
- Transformation DTOs should be wrapped in a feature-response DTO. This multi-level typing requires use of the `@Type(() => a-to-b-dto)` class-transformer decorator in the feature-response DTO, to allow serialization to work correctly on the nested transformation DTO.
  - Example: `src/partners/dtos/partners-response-dto.ts`
