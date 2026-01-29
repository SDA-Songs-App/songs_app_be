import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma-service';
import { CreateArtistDto } from 'src/artist/dto/create-artist-dto';
@Injectable()
export class ArtistRepository {
  constructor(private prismaService: PrismaService) {}
  async create(createDto: CreateArtistDto) {
    const artist = await this.findByName(createDto.name);
        if( artist){
          if(artist.deletedAt){
             return this.restoreArtist(artist.Id)
            }
            else{
              throw new Error(`Artist with name ${createDto.name} already exist`)
            }
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
    if(!id){
      throw new Error("Artist Id is required")
    }
    return this.prismaService.artist.findUnique({ where: { Id: id } });
  }
  async findAllArtists() {
    return this.prismaService.artist.findMany({
      where:{deletedAt:null}
    });
  }
  async update(id: number, updateDto: CreateArtistDto) {
    return this.prismaService.artist.update({
      where: { Id: id },
      data: updateDto,
    });
  }
  async delete(id: number) {
    const artist = await this.prismaService.artist.findUnique({
               where:{Id:id}
           })
           if(!artist){
               throw new NotFoundException(`Artist with ID ${id} not found`)
           }
           if(artist.deletedAt){
               throw new BadRequestException(`Artist with ID ${id} is alredy deleted`)
           }
           return await this.prismaService.artist.update({
               where:{Id:id},data:{deletedAt: new Date()}})
  }
  async findByName(name:string){
    return this.prismaService.artist.findFirst({where: {name:name}})
  }
  async restoreArtist(id:number){
     return this.prismaService.artist.update({
          where: { Id: id },
          data: {
            deletedAt: null,
          }
      });
  }
}
