import { Injectable } from '@nestjs/common';
import { LyricsRepository } from 'src/repositories/lyrics-repo';
import { CreateLyricsDto } from './dto/create-lyrics-dto';
import { Certificate } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LyricsService {
    constructor(
        private readonly lyricsRepo:LyricsRepository, 
        private readonly prisma:PrismaService){}
    create(createDto: CreateLyricsDto){
        return this.lyricsRepo.create(createDto)
    }
    findAllLyrics(){
        return this.lyricsRepo.findAllLyrics();
    }
    async findLyricsById(id:number){
      console.log('Service id:', id); 
        return await this.lyricsRepo.findLyricsById(id)
    }
    async deleteLyrics(id:number){
        return await this.lyricsRepo.deleteLyrics(id);
    }
 
async toggleSongStatus(id: number) {
  const song = await this.prisma.lyrics.findUnique({
    where: { Id:id },
    select: { deletedAt: true }
  });

  const toggleValue = song.deletedAt ? null : new Date();

  return this.prisma.lyrics.update({
    where: { Id:id },
    data: { deletedAt: toggleValue }
  });
}
    async updateLyricStatus(lyricId: number, status: 'APPROVED' | 'REJECTED') {
    return this.lyricsRepo.updateLyricStatus(lyricId, status);
  }
  async hasUpdates(since?:string){
    return await this.lyricsRepo.hasUpdates(since)
  }
  async syncLyrics(since?:string){
    return await this.lyricsRepo.syncLyrics(since)
  }
}
