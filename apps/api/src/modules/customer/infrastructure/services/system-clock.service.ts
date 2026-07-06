import { Injectable } from '@nestjs/common';
import { Clock } from '../../application/interfaces/clock';

@Injectable()
export class SystemClockService implements Clock {
  now(): Date {
    return new Date();
  }
}
