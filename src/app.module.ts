import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {PrismaService} from './prisma.service'
import {ApiModule} from './api/api.module'

@Module({
  imports: [ConfigModule.forRoot(), ApiModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
