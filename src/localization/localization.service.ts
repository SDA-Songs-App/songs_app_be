import { Injectable } from '@nestjs/common';
import { Localization } from 'src/repositories/localization-repo';
import { CreateLocalizationDto } from './dto/localization-create-dto';

@Injectable()
export class LocalizationService {
  constructor(private readonly localizationRepo: Localization) {}

  create(createDto: CreateLocalizationDto) {
    return this.localizationRepo.create(createDto);
  }
  findMany() {
    return this.localizationRepo.findMany();
  }

  async findOne(id: number) {
    return await this.localizationRepo.findOne(id);
  }
}
