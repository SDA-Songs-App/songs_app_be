import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album-dto';

@Controller('albums')
export class AlbumController {
    constructor(private readonly albumService:AlbumService){}
    
    @Get()
    getAll(){
        return this.albumService.findAll();
    }
    @Post()
    create( @Body() crtDTO:CreateAlbumDto){
        return this.albumService.create(crtDTO)
    }
}
