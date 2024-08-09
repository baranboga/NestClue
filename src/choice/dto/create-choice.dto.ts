import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateChoiceDto {
  @ApiProperty()
  @IsString()
  choiceText: string;

  @ApiProperty()
  @IsInt()
  nodeId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  nextNodeId?: number;
}
