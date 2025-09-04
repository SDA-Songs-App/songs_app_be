import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { LyricsService } from './lyrics.service';
import { CreateLyricsDto } from './dto/create-lyrics-dto';
import { UpdateLyricsDto } from './dto/update-lyrics-dto';

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
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id:string, @Body() updateDto:UpdateLyricsDto){
       return this.lyricsService.update(+id,updateDto)
    }
}
