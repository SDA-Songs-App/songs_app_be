import { Injectable } from '@nestjs/common';
import { ArtistRepository } from 'src/repositories/artist-repo';
import { CreateArtistDto } from './dto/create-artist-dto';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  create(dto: CreateArtistDto, id:number) {
    return this.artistRepository.create(dto, id);
  }

  findAllArtists() {
    return this.artistRepository.findAllArtists();
  }

  findArtistById(id: number) {
    return this.artistRepository.findOne(id);
  }

  deleteArtist(id: number) {
    return this.artistRepository.delete(id);
  }
}
