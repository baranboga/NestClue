import { Module } from '@nestjs/common';
import { PlayerProgressService } from './playerProgress.service';
import { PlayerProgressController } from './playerProgress.controller';


@Module({
  controllers: [PlayerProgressController],
  providers: [PlayerProgressService],
  exports: [PlayerProgressService],
})
export class PlayerProgressModule {}
