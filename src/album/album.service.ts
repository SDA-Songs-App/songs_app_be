import { Injectable } from '@nestjs/common';
import { AlbumRepository } from 'src/repositories/album-repo';
import { CreateAlbumDto } from './dto/create-album-dto';

@Injectable()
export class AlbumService {
    constructor(private albumRepo:AlbumRepository){}
    async findAll(){
        return await this.albumRepo.findAll();
    }
    async create(createAlb:CreateAlbumDto){
        return await this.albumRepo.create(createAlb)
    }
}

