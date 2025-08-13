import { Injectable } from '@nestjs/common';
import { LyricsRepository } from 'src/repositories/lyrics-repo';
import { CreateLyricsDto } from './dto/create-lyrics-dto';

@Injectable()
export class LyricsService {
    constructor(private readonly lyricsRepo:LyricsRepository){}
    create(dto: CreateLyricsDto){}
    findAllLyrics(){
        return this.lyricsRepo.findAllLyrics();
    }
    async findLyricsById(id:number){
        return await this.lyricsRepo.findLyricsById(id)
    }
    
}
