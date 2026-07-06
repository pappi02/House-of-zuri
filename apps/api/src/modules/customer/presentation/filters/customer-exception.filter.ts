import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { DuplicateCustomerException } from '../../domain/exceptions/duplicate-customer.exception';
import { CustomerNotFoundException } from '../../domain/exceptions/customer-not-found.exception';
import { InvalidCustomerException } from '../../domain/exceptions/invalid-customer.exception';

@Catch(DuplicateCustomerException, CustomerNotFoundException, InvalidCustomerException)
export class CustomerExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomerExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.toStatus(exception);
    const message = this.toMessage(exception);

    this.logger.warn(`Customer exception: ${exception.name} - ${message}`);

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.name,
    });
  }

  private toStatus(exception: Error): HttpStatus {
    if (exception instanceof DuplicateCustomerException) {
      return HttpStatus.CONFLICT;
    }

    if (exception instanceof CustomerNotFoundException) {
      return HttpStatus.NOT_FOUND;
    }

    if (exception instanceof InvalidCustomerException) {
      return HttpStatus.BAD_REQUEST;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private toMessage(exception: Error): string {
    if (exception instanceof HttpException) {
      return exception.message;
    }

    return exception.message;
  }
}
