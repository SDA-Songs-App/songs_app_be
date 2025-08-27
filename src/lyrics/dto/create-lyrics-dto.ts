import { CATEGORIES, LANGUAGES } from "@prisma/client";
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from "class-validator";


export class CreateLyricsDto{
        @IsOptional() @IsInt()
        contentId?:number
        @IsOptional() @IsInt()
        albumId?:number
        @IsOptional() @IsInt()
        artistId?:number
        @IsOptional() @IsString()
        audioFileUrl?:string
        @IsEnum(LANGUAGES)
        language:LANGUAGES
        @IsEnum(CATEGORIES)
        category:CATEGORIES 
}