import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateUtil } from '@common/dates/utils/date.util';
import { RequestWithStartTime, TransformedResponse } from '@common/interfaces';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, TransformedResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<TransformedResponse<T>> {
    const request: RequestWithStartTime = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        return {
          responseTime: DateUtil.formatTimestamp(Date.now()),
          requestDuration: Date.now() - request._startTime,
          payload: data,
        };
      }),
    );
  }
}
