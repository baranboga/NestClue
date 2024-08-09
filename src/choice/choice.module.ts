import { Module } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { ChoiceController } from './choice.controller';

@Module({
  controllers: [ChoiceController],
  providers: [ChoiceService],
  exports: [ChoiceService],
})
export class ChoiceModule {}
