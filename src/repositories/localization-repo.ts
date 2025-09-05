import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma-service';
import { CreateLocalizationDto } from 'src/localization/dto/localization-create-dto';

@Injectable()
export class Localization {
  constructor(private prismaService: PrismaService) {}
  async create(createDto: CreateLocalizationDto) {
    return await this.prismaService.localizations.create({
      data: {
        language_key: createDto.language_key,
        Header: createDto.Header,
        notFound: createDto.notFound,
        author: createDto.author,
        CopyErrorTitle: createDto.CopyErrorTitle,
        CopyErrorDescription: createDto.CopyErrorDescription,
        LyricsCopiedTitle: createDto.LyricsCopiedTitle,
        LyricsCopiedDescription: createDto.LyricsCopiedDescription,
      },
    });
  }
  async findOne(id: number) {
    return await this.prismaService.localizations.findUnique({
      where: { Id: id },
    });
  }
  async findMany() {
    return await this.prismaService.localizations.findMany();
  }
  async update(id: number) {
    return await this.prismaService.localizations.update({
      where: { Id: id },
      data: {},
    });
  }
  async delete(id: number) {
    return await this.prismaService.localizations.delete({
      where: { Id: id },
    });
  }
}
