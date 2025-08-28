import { CATEGORIES, LANGUAGES } from "@prisma/client";
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from "class-validator";


export class CreateLyricsDto{
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
        @IsOptional()
        contents?:{
         title?:string
         chorus?:string
         verse1?:string
         verse2?:string
         verse3?:string
         verse4?:string
         verse5?:string
         verse6?:string
        }[]
}