import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { LyricsService } from './lyrics.service';
import { CreateLyricsDto } from './dto/create-lyrics-dto';

@Controller('lyrics')
export class LyricsController {
    constructor(private readonly lyricsService:LyricsService){}
    @Post()
    create(@Body() dto:CreateLyricsDto){
        return this.lyricsService.create(dto)
    }
    @Get()
    findAll(){
      return this.lyricsService.findAllLyrics()
    }
    @Get(':Id')
    findOne(@Param('Id') Id:string){
        return this.lyricsService.findLyricsById(+Id)
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:string){
        return this.lyricsService.deleteLyrics(+id);
    }
}
