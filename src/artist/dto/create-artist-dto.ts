import { IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  genre?: string;
  @IsOptional()
  @IsString()
  bio?: string;
  @IsOptional()
  @IsString()
  imageUrl?: string;
  @IsString()
  languageKey:string;
}
