import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlayerProgressService } from './playerProgress.service';
import { CreatePlayerProgressDto } from './dto/create-player-progress.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('playerProgress')
@Controller('playerProgress')
export class PlayerProgressController {
  constructor(private readonly playerProgressService: PlayerProgressService) {}

  @Get(':playerId')
  getPlayerProgress(@Param('playerId') playerId: number) {
    return this.playerProgressService.getPlayerProgress(playerId);
  }

  @Post()
  createPlayerProgress(@Body() createPlayerProgressDto: CreatePlayerProgressDto) {
    return this.playerProgressService.createPlayerProgress(createPlayerProgressDto);
  }
}
