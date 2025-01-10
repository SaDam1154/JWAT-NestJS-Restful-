import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctxType = host.getType<GqlContextType>();

    // Xử lý cho HTTP
    if (ctxType === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error';

      response.status(status).json({
        statusCode: status,
        message,
        path: request.url,
      });
    }
    // Xử lý cho GraphQL
    else if (ctxType === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      const ctx = gqlHost.getContext();
      const response = ctx?.res;

      if (!response) {
        console.error('Response object is undefined in GraphQL context.');
        return;
      }

      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error';

      response.status(status).json({
        errors: [
          {
            message,
            path: gqlHost.getInfo().path,
            extensions: {
              code:
                status === HttpStatus.INTERNAL_SERVER_ERROR
                  ? 'INTERNAL_SERVER_ERROR'
                  : 'BAD_REQUEST',
            },
          },
        ],
        data: null,
      });
    }
  }
}
