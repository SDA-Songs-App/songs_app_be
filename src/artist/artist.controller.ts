import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist-dto';
import { ArtistService } from './artist.service';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() dto: CreateArtistDto, id:number) {
    return this.artistService.create(dto, id);
  }

  @Get()
  findAll() {
    return this.artistService.findAllArtists();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.artistService.findArtistById(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.artistService.deleteArtist(id);
  }
}
