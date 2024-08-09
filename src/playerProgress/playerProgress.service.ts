import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayerProgressService {
  constructor(private prisma: PrismaService) {}

  async getPlayerProgress(playerId: number) {
    return this.prisma.playerProgress.findMany({
      where: { playerId },
      include: {
        currentNode: true,
      },
    });
  }

  async createPlayerProgress(data: { playerId: number; currentNodeId: number }) {
    return this.prisma.playerProgress.create({
      data,
    });
  }
}
