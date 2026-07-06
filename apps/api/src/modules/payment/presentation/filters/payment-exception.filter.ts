import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class PaymentExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: exception instanceof Error ? exception.message : 'Payment processing failed.',
    });
  }
}
