import { IsString, IsBoolean, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChoiceDto {
  @ApiProperty({ description: 'Choice metni' })
  @IsString()
  choiceText: string;

  @ApiProperty({ description: 'Choice\'un bağlı olduğu Node ID\'si' })
  @IsNumber()
  nodeId: number;

  @ApiProperty({ description: 'Bir sonraki Node ID\'si', required: false })
  @IsOptional()
  @IsNumber()
  nextNodeId?: number;
}

export class UpdateNodeDto {
  @ApiProperty({ description: 'Node başlığı' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Node açıklaması' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Bu node son mu?', default: false })
  @IsBoolean()
  isEnd: boolean;

  @ApiProperty({ type: [UpdateChoiceDto], description: 'Bu Node\'a bağlı Choice\'lar' })
  @ValidateNested({ each: true })
  //Eğer choices özelliği bir dizi ise ve bu dizinin her bir elemanı bir UpdateChoiceDto nesnesiyse, 
  //bu dekoratör her bir UpdateChoiceDto nesnesinin doğrulanmasını sağlar
  @Type(() => UpdateChoiceDto)
   //@Type(() => UpdateChoiceDto) dekoratörü, JSON verisini UpdateChoiceDto türündeki nesnelere dönüştürür.
  choices: UpdateChoiceDto[];
  //choices: UpdateChoiceDto[] tanımı, choices özelliğinin bir UpdateChoiceDto dizisi olduğunu belirtir.
}
