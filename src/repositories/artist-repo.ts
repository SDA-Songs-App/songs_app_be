import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { PrismaService } from 'prisma/prisma-service';
import { CreateArtistDto } from 'src/artist/dto/create-artist-dto';

@Injectable()
export class ArtistRepository {
  constructor(private prismaService: PrismaService) {}
  async create(createDto: CreateArtistDto, id: number) {
    const artist = await this.findOne(id);
        if( artist && artist.name === createDto.name){
            throw new Error(`Artist with id of ${id} already exist`)
        }
    return this.prismaService.artist.create({
      data: {
        name: createDto.name,
        genre: createDto.genre,
        bio: createDto.bio,
        imageUrl: createDto.imageUrl,
      },
      include: {
        Album: true,
        Lyrics: true,
      },
    });
  }
  async findOne(id: number) {
    return this.prismaService.artist.findUnique({ where: { Id: id } });
  }
  async findAllArtists() {
    return this.prismaService.artist.findMany();
  }

  async update(id: number, updateDto: CreateArtistDto) {
    return this.prismaService.artist.update({
      where: { Id: id },
      data: updateDto,
    });
  }

  async delete(id: number) {
    return this.prismaService.artist.delete({ where: { Id: id } });
  }
  async findByName(name:string){
    return this.prismaService.artist.findFirst({where: {name:name}})
  }
}
