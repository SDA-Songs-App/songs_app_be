import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma-service";
import { CreateLyricsDto } from "src/lyrics/dto/create-lyrics-dto";
import { UpdateLyricsDto } from "src/lyrics/dto/update-lyrics-dto";

@Injectable()
export class LyricsRepository{
    constructor(private prismaService:PrismaService){}
    async create(createDto:CreateLyricsDto){
         return await this.prismaService.lyrics.create({
            data:{
              contentId:  createDto.contentId,
              albumId:createDto.albumId,
              artistId:createDto.artistId,
              audioFileUrl:createDto.audioFileUrl,
              language:createDto.language,
              Category:createDto.category
            },
            include:{
                Artist:true,
                Album:true,
                LyricsContents:true
            }
         })
    }
    async findAllLyrics(){
        return await this.prismaService.lyrics.findMany({
            where:{deletedAt:null},
            orderBy:{createdAt:'desc'}
        });
    }
    async findLyricsById(id:number){
        return await this.prismaService.lyrics.findUnique({where:{Id:id, deletedAt:null}})
    }
    async deleteLyrics(id:number){
        return await this.prismaService.lyrics.update({
            where:{Id:id},data:{deletedAt: new Date()}})
    }
    async update(id:number, updateDto:UpdateLyricsDto){
      return await this.prismaService.lyrics.update({
        where:{Id :id},
        data:{
            ...updateDto
        },
        include:{
            Artist:true,
            Album:true,
            LyricsContents:true
        }
      })
    }
    async restoreDeletedLyrics(id:number){
        return await this.prismaService.lyrics.update({
            where:{Id:id},
            data:{deletedAt:null}
        })
    }
} 