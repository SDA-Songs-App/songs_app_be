import {
  Body,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Controller,
} from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { CreateLocalizationDto } from './dto/localization-create-dto';

@Controller('localization')
export class LocalizationController {
  constructor(private readonly localizationService: LocalizationService) {}

  @Post()
  create(@Body() dto: CreateLocalizationDto) {
    return this.localizationService.create(dto);
  }

  @Get()
  findMany() {
    return this.localizationService.findMany();
  }

  @Get(':Id')
  findOne(@Param('Id') Id: string) {
    return this.localizationService.findOne(+Id);
  }
}
