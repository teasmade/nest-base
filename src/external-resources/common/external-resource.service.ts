import { Injectable } from '@nestjs/common';
import { PaginatedOasisResponse } from '@oasis/oasis-common/interfaces/oasis-pagination.interface';
import { TransformedOasisResponse } from '@oasis/oasis-common/interfaces/transformed-oasis-response.interface';
import { instanceToPlain } from 'class-transformer';

/**
 * Base class for external resource services (i.e. services that interact with external resources such as Oasis).
 * @remarks This class provides a generic implementation for assigning an Oasis response to a transformation DTO.
 */
@Injectable()
export abstract class ExternalResourceService {
  constructor() {}

  /**
   * Assigns an Oasis response to a transformation DTO.
   * @param oasisResponse - The Oasis response to assign to the transformation DTO.
   * @param dtoClass - The class of the transformation DTO to assign the Oasis response to.
   * @returns The transformation DTO with the Oasis response assigned to it.
   * @remarks This method should be used with ```@UseInterceptors(ClassSerializerInterceptor)``` decorator on the controller class to ensure correct class-transformer serialization of the response.
   */
  protected assignOasisResponseToTransformationDTO<T, D extends T>(
    oasisResponse: PaginatedOasisResponse<T>,
    dtoClass: new () => TransformedOasisResponse<D>,
  ): TransformedOasisResponse<D> {
    const dto = new dtoClass();
    dto.value = oasisResponse.data.value as D[];
    dto.pagination = oasisResponse.pagination;
    return dto;
  }

  /**
   * Transforms an input DTO to an Oasis resource body to be sent to the Oasis API.
   * @param inputDTO - The input DTO to transform to an Oasis body.
   * @returns The Oasis resource body as a plain object.
   * @remarks This method is the second step in the input validation / transformation process. We have to split the proess in two for class-validator and class-transformer to work correctly.
   */
  protected transformInputDTOToOasisBody<T, D>(inputDTO: D): T {
    return instanceToPlain(inputDTO) as T;
  }
}
