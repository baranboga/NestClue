import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateNodeDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isEnd?: boolean;
}
