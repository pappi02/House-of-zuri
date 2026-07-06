import { Controller, Get } from '@nestjs/common';
import { db } from './db';

@Controller('db')
export class DbController {
  @Get('test')
  async test() {
    const count = await db.customer.count();

    return {
      status: 'ok',
      customers: count,
    };
  }
}
