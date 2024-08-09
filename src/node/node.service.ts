import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NodeService {
  constructor(private prisma: PrismaService) {}

  async getAllNodes() {
    return this.prisma.node.findMany({
      include: {
        choices: true,
        nextChoices: true,
      },
    });
  }

  async getNodeById(id: number) {
    return this.prisma.node.findUnique({
      where: { id },
      include: {
        choices: true,
        nextChoices: true,
      },
    });
  }

  async createNode(data: { title: string; description?: string; isEnd?: boolean }) {
    return this.prisma.node.create({
      data,
    });
  }
}
