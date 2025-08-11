import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma-service";
import { CreateLyricsDto } from "src/lyrics/dto/create-lyrics-dto";
import { UpdateLyricsDto } from "src/lyrics/dto/update-lyrics-dto";

@Injectable()
export class LyricsRepository{
    constructor(private prismaService:PrismaService){}
    create(data:CreateLyricsDto){}
    async findAllLyrics(){
        return await this.prismaService.lyrics.findMany();
    }
    async findLyricsById(Id:number){
        return await this.prismaService.lyrics.findUnique({where:{Id}})
    }
    update(id:number, data:UpdateLyricsDto){}
} 