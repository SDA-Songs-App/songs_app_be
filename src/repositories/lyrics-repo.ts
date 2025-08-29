import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma-service";
import { CreateLyricsDto } from "src/lyrics/dto/create-lyrics-dto";
import { UpdateLyricsDto } from "src/lyrics/dto/update-lyrics-dto";

@Injectable()
export class LyricsRepository{
    constructor(private prismaService:PrismaService){}
    async create(createDto:CreateLyricsDto){
         return await this.prismaService.lyrics.create({
            data:{
              albumId:createDto.albumId,
              artistId:createDto.artistId,
              audioFileUrl:createDto.audioFileUrl,
              language:createDto.language,
              Category:createDto.category,
              LyricsContents:createDto.contents?.length 
                               ? {create: createDto.contents.map(c =>({
                                  verse1:c.verse1,
                                  verse2:c.verse2,
                                  verse3:c.verse3,
                                  verse4:c.verse4,
                                  verse5:c.verse5,
                                  verse6:c.verse6,
                                  chorus:c.chorus,
                                  title:c.title
                               }))}
                               : undefined
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
            orderBy:{createdAt:'desc'},
            include:{
                LyricsContents:true
            }
        });
    }
    async findLyricsById(id:number){
        return await this.prismaService.lyrics.findUnique({
            where:{Id:id, deletedAt:null}, include:{
                LyricsContents:true
            }})
    }
    async deleteLyrics(id:number){
        const lyric = await this.prismaService.lyrics.findUnique({
            where:{Id:id}
        })
        if(!lyric){
            throw new NotFoundException(`Lyrics with ID ${id} not found`)
        }
        if(lyric.deletedAt){
            throw new BadRequestException(`Lyrics with ID ${id} is alredy deleted`)
        }
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