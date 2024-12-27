import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private HttpResponseCode(status: number): string {
    const errorCodes = {
      [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST_INPUT',
      [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
      [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
      [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
    };
    return errorCodes[status] || 'UNKNOWN_ERROR';
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorCode = this.HttpResponseCode(status);
    const errorDetail = exception.getResponse
      ? exception.getResponse()
      : { message: exception.message };

    const devMessage =
      typeof errorDetail === 'string'
        ? errorDetail
        : (errorDetail as any).message || 'Unexpected error occurred';

    const stackTrace =
      process.env.NODE_ENV !== 'production' ? exception.stack : undefined;

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      errorCode: errorCode,
      devMessage: devMessage,
      status: status,
      data: request.body,
      ...(stackTrace && { stack: stackTrace }), // Chỉ trả stack trace trong môi trường dev
    });
  }
}
