import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreatePlayerProgressDto {
  @ApiProperty()
  @IsInt()
  playerId: number;

  @ApiProperty()
  @IsInt()
  currentNodeId: number;
}
