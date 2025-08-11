import { IsDate, IsString } from "class-validator";


export class CreateLyricsDto{
    @IsString()
    Language :  string
    @IsDate()
    CreatedAt: Date  
}