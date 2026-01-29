import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { PrismaService } from '../prisma/prisma-service';
import { NotificationsService } from './notifications.service';

@Module({
      controllers: [NotificationsController],
      providers: [ PrismaService, NotificationsService]
})
export class NotificationsModule {}
