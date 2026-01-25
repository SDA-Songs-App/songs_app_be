import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
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
    // @Get(':Id')
    // findOne(@Param('Id') Id:string){
    //     return this.lyricsService.findLyricsById(+Id)
    // }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:string){
        return this.lyricsService.deleteLyrics(+id);
    }
    @Patch(':id/toggle')
    async toggleSongStatus(@Param('id') id: number) {
        this.lyricsService.toggleSongStatus(id)
    }
     @Patch(':id/status')
  async updateLyricStatus(
    @Param('id') id: string,
    @Body() body: { lyricId: number; status: 'APPROVED' | 'REJECTED' }) {
    const { lyricId, status } = body;
    return this.lyricsService.updateLyricStatus(lyricId, status);
  }
  @Get('sync')
  async sync(@Query('since') since?: string) {
    return this.lyricsService.syncLyrics(since);
  }
  @Get('has-updates')
  async hasUpdates(@Query('since') since?: string) {
    console.log('Controller hit!');   // <-- add this
    console.log('Received since:', since);
    return this.lyricsService.hasUpdates(since);
  }
}
