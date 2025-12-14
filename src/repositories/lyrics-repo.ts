import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma-service";
import { LANGUAGE_MAP } from "src/config/lanaguage-mapping";
import { CreateLyricsDto } from "src/lyrics/dto/create-lyrics-dto";
import { UpdateLyricsDto } from "src/lyrics/dto/update-lyrics-dto";
import { SocketGateway } from "src/web-socket/socket.gateway";

@Injectable()
export class LyricsRepository{
    constructor(
        private prismaService:PrismaService,
        private socket:SocketGateway){}
        
    async create(createDto:CreateLyricsDto){
       
         const dataCreated = await this.prismaService.lyrics.create({
            
            data:{
              albumId:createDto.albumId,
              artistId:createDto.artistId,
              audioFileUrl:createDto.audioFileUrl,
              language:createDto.language,
              Category:createDto.category,
              LyricsContents:createDto.contents?.length 
                               ? {create: createDto.contents.map(c =>({
                                 status:'PENDING',
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
         const createdContent = dataCreated.LyricsContents[0];

     //     this.socket.broadcastDataupdated({type:'create', item:dataCreacted})
         //create notification
        // const firstContentId = createDto.contents[0].Id;

       const notif=  await this.prismaService.notifications.create({
            data:{
                songId:createdContent.Id,
                type:'SONG-PENDING',
                message:`New Song ${createDto.contents[0].title} added`,
            }
         })
         console.log("Notification", notif)
         // Soccket 
        this .socket.notifyAll('notification: new', {
              message:`new song "${createDto.contents[0].title}" added`
        })
          return dataCreated;
         
    }
    async findAllLyrics(){
       const songs = await this.prismaService.lyrics.findMany({
        where:{},
            orderBy:{createdAt:'desc'},
            include:{
                LyricsContents:true, 
                Artist:true
            }
        });
 const mappedSongs = songs.map((song) => {
   const langKey = song.language?.toString().trim().toUpperCase();
    const mappedLang = LANGUAGE_MAP[langKey] || song.language;

    return {
      ...song,
      language: mappedLang,
    };
  });
  return mappedSongs
    }
    async findLyricsById(id:number){
        return await this.prismaService.lyrics.findFirst({
            where:{Id:id}, 
            include:{
                LyricsContents:true, 
                Artist:true
            }})
    }
     async findLyricsByName(id:number){
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
    async approve(id:number){
        const song = await this.prismaService.lyrics.update({
            where:{Id:id}, 
            data:{ 
                LyricsContents:{
                    updateMany:{
                        where:{},
                        data:{
                            status:'APPROVED',
                        }
                    }, 
                  
                },
                updatedAt:new Date()
        }, include:{
            LyricsContents:true,
        }
        })
        this.socket.notifyAll('song:approved', {songId:song.Id})
        return song;
    }
    async getApproved(after?:Date){
        const where:any = {status:'APPROVED', deletedAt:null}
        if(after) where.updatedAt = {gt:after};
        return this.prismaService.lyrics.findMany({
            where
        })
    }
    async getNotifications(userId:number){
        return this.prismaService.notifications.findMany({
            where:{userId}, 
            orderBy:{createdAt:'desc'}
        })
    }
    
  async updateLyricStatus(lyricId: number, status: 'APPROVED' | 'REJECTED') {
    return this.prismaService.lyricsContents.update({
      where: { Id: lyricId },
      data: { status, approvedAt: status === 'APPROVED' ? new Date() : null },
    });
  }
} 