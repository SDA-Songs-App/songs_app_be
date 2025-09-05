import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { LocalizationController } from './localization.controller';
import { Localization } from 'src/repositories/localization-repo';
import { PrismaService } from 'prisma/prisma-service';

@Module({
  controllers: [LocalizationController],
  providers: [LocalizationService, Localization, PrismaService],
  exports: [LocalizationService, Localization],
})
export class LocalizationModule {}
