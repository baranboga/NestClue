import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { PrismaModule } from './prisma/prisma.module';
import { NodeModule } from './node/node.module';
import { ChoiceModule } from './choice/choice.module';
import { PlayerProgressModule } from './playerProgress/playerProgress.module';


@Module({
  imports: [
    //ConfigModule is imported in the AppModule to make the configuration available throughout the application.
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    NodeModule,
    ChoiceModule,
    PlayerProgressModule
  ],
})
export class AppModule {}
