import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { CreateChoiceDto} from './dto/create-choice.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('choices')
@Controller('choices')
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Get()
  getAllChoices() {
    return this.choiceService.getAllChoices();
  }

  @Get(':id')
  getChoiceById(@Param('id') id: number) {
    return this.choiceService.getChoiceById(id);
  }

  @Post()
  createChoice(@Body() createChoiceDto: CreateChoiceDto) {
    return this.choiceService.createChoice(createChoiceDto);
  }

  @Delete(':id')
  deleteChoice(@Param('id') id: number) {
    return this.choiceService.deleteChoice(id);
  }

  @Get(':id/next-node')
  async getNextNode(@Param('id') choiceId: number) {
    return this.choiceService.getNextNodeForChoice(choiceId);
  }
}
