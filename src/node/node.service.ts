import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateNodeDto } from './dto/update-node.dto';

@Injectable()
export class NodeService {
  constructor(private prisma: PrismaService) {}

  //İnclude ile ilişkili tabloları da çekiyoruz
  async getAllNodes() {
    return this.prisma.node.findMany({
      include: {
        choices: true,
        nextChoices: true,
      },
    });
  }

  //where ile sadece belirli bir Node'u çekiyoruz
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

  async updateNode(id: number, updateNodeDto: UpdateNodeDto) {
    // Önce güncellenecek Node'u bul
    const existingNode = await this.prisma.node.findUnique({
      where: { id },
      include: { choices: true }, // İlişkili Choice'ları da dahil et
    });
    // Eğer Node bulunamazsa hata fırlat
    if (!existingNode) {
      throw new NotFoundException(`Node with ID ${id} not found`);
    }
    // Önce Node'u güncelle
    const updatedNode = await this.prisma.node.update({
      where: { id },
      data: {
        title: updateNodeDto.title,
        description: updateNodeDto.description,
        isEnd: updateNodeDto.isEnd,
      },
    });
    // Eski Choice'ları sil
    await this.prisma.choice.deleteMany({
      where: { nodeId: id },
    });
    // Yeni Choice'ları ekle
    //choicesData adında bir değişken kullanmak, veri üzerinde daha fazla kontrol ve işleme esnekliği sağlar, 
    //hata ayıklama sürecini kolaylaştırır ve kodun okunabilirliğini artırır. 
    //Ancak, veri üzerinde herhangi bir dönüşüm veya işleme yapmanıza gerek yoksa ve veriyi doğrudan kullanabiliyorsanız,
    // doğrudan createMany metodunu kullanmak da mümkündür. 
    //Seçiminiz, projenizin gereksinimlerine ve veri işleme ihtiyacınıza bağlıdır.
    
    const choicesData = updateNodeDto.choices.map(choice => ({
      choiceText: choice.choiceText,
      nodeId: id,
      nextNodeId: choice.nextNodeId,
    }));

    await this.prisma.choice.createMany({
      data: choicesData,
    });
    return await this.prisma.node.findUnique({
      where: { id },
      include: {
        choices: true,
        nextChoices: true,
      },
    });
  }

  async deleteNode(id: number) {
    //deleteMany de unique olmayan değerlerle silme işlemi yapılır.
    // Önce bağlı Choice kayıtlarını sil
    await this.prisma.choice.deleteMany({
      where: {
        nodeId: id,
      },
    });
    // Ardından Node'u sil
    //delete ile unique değerlerle silme işlemi yapılır.
    return this.prisma.node.delete({
      where: {
        id: id,
      },
    });
  }
}
