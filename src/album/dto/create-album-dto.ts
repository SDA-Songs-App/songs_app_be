import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;
  @IsOptional()
  @IsInt()
  artistId?: number;
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  releaseDate?: Date;
  @IsOptional()
  @IsString()
  coverImageUrl?: string;
}
