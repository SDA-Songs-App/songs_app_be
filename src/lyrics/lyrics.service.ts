import { Injectable } from '@nestjs/common';
import { LyricsRepository } from 'src/repositories/lyrics-repo';
import { CreateLyricsDto } from './dto/create-lyrics-dto';
import { Certificate } from 'crypto';

@Injectable()
export class LyricsService {
    constructor(private readonly lyricsRepo:LyricsRepository){}
    create(createDto: CreateLyricsDto){
        return this.lyricsRepo.create(createDto)
    }
    findAllLyrics(){
        return this.lyricsRepo.findAllLyrics();
    }
    async findLyricsById(id:number){
        return await this.lyricsRepo.findLyricsById(id)
    }
    async deleteLyrics(id:number){
        return await this.lyricsRepo.deleteLyrics(id);
    }
    
}
