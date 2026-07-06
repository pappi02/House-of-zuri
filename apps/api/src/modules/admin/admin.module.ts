import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TimelineController } from './presentation/timeline.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TimelineController],
})
export class AdminModule {}
