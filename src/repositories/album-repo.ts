import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAlbumDto } from "../album/dto/create-album-dto";

@Injectable()
export class AlbumRepository{
    constructor (private prismaService : PrismaService){}
async create(createAlbum:CreateAlbumDto){
    
        return this.prismaService.album.create({
          data: {
          title:createAlbum.title,
          releaseDate:createAlbum.releaseDate,
          coverImageUrl:createAlbum.coverImageUrl,
          artistId:createAlbum.artistId
          },
          include: {
            Lyrics: true,
            Artist:true
          },
        });

}
async findAll(){
    return await this.prismaService.album.findMany();
}
 async findOne(id: number) {
    if(!id){
      throw new Error("Album Id is required")
    }
    return this.prismaService.album.findUnique({ where: { Id: id } });
  }
async delete(){}
async update(){}
async findByName(){}
}