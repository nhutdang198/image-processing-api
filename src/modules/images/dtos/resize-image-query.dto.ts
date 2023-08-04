import {
  IsString,
  IsNotEmpty,
  IsNumber,
  // IsInt,
  IsOptional,
  Min
} from 'class-validator';
import { Exclude, Type, Expose } from 'class-transformer';

@Exclude()
export class ResizeImageQuery {
  @Expose()
  @IsString()
  @IsNotEmpty()
  filename!: string;

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  // @IsInt()
  @Min(0)
  height?: number;

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  // @IsInt()
  @Min(0)
  width?: number;
}
