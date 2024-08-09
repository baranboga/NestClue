import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChoiceService {
  constructor(private prisma: PrismaService) {}

  async getAllChoices() {
    return this.prisma.choice.findMany({
      include: {
        node: true,
        nextNode: true,
      },
    });
  }

  async getChoiceById(id: number) {
    return this.prisma.choice.findUnique({
      where: { id },
      include: {
        node: true,
        nextNode: true,
      },
    });
  }

  async createChoice(data: { choiceText: string; nodeId: number; nextNodeId?: number }) {
    return this.prisma.choice.create({
      data,
    });
  }

  async deleteChoice(id: number) {
    return this.prisma.choice.delete({
      where: { id },
    });
  }

  async getNextNodeForChoice(choiceId: number) {
    const choice = await this.prisma.choice.findUnique({
      where: { id: choiceId },
      include: { nextNode: true },
    });

    if (!choice) {
      throw new Error('Choice not found');
    }

    return choice.nextNode;
  }
}

