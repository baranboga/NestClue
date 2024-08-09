import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NodeService } from './node.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('nodes')
@Controller('nodes')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Get()
  getAllNodes() {
    return this.nodeService.getAllNodes();
  }

  @Get(':id')
  getNodeById(@Param('id') id: number) {
    return this.nodeService.getNodeById(id);
  }

  @Post()
  createNode(@Body() createNodeDto: CreateNodeDto) {
    return this.nodeService.createNode(createNodeDto);
  }
}
