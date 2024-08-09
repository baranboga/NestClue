import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('API Dokümantasyonu')
  .setDescription('API dokümantasyonunun açıklaması')
  .setVersion('1.0')
  .addTag('API')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      //fazladan gelen veriyi engellemek için whitelist: true diyerek sadece gelen veriyi kabul eder.
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: '*', // Tüm kaynaklardan gelen isteklere izin verir
  });
  await app.listen(3333);
}
bootstrap();


//ORM Terimleri

//DIŞ SORGULAR
//findMany: Tüm verileri çekmek için kullanılır. Örneğin, tüm Node'ları çekmek için findMany() kullanılır.

//FindUnique: Belirli bir veriyi çekmek için kullanılır. Örneğin, id'si 1 olan Node'u çekmek için findUnique({ where: { id: 1 } }) kullanılır.

//Create: Yeni bir veri oluşturmak için kullanılır. Örneğin, yeni bir Node oluşturmak için create({ data: { title: 'Title' } }) kullanılır.

//Delete: Belirli bir veriyi silmek için kullanılır. Örneğin, id'si 1 olan Node'u silmek için delete({ where: { id: 1 } }) kullanılır. Dikkat etmek gerekir uniqie değerlerle silme işlemi yapılır.

//DeleteMany: Belirli bir koşulu sağlayan verileri silmek için kullanılır. Örneğin, title'ı 'Title' olan tüm Node'ları silmek için deleteMany({ where: { title: 'Title' } }) kullanılır.

//CreateMany: Birden fazla veri oluşturmak için kullanılır. Örneğin, birden fazla Node oluşturmak için createMany({ data: [{ title: 'Title 1' }, { title: 'Title 2' }] }) kullanılır.

//İÇ SORGULAR
//where: Sorgulama yaparken belirli bir koşulu sağlayan verileri çekmek için kullanılır. Örneğin, id'si 1 olan Node'u çekmek için where: { id: 1 } kullanılır.

//İnculude: İlişkili tabloları sorguya dahil etmek için kullanılır. Örneğin, bir Node tablosundaki her bir Node'un ilişkili Choice'larını çekmek için include: { choices: true } kullanılır.


