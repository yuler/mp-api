import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {HttpModule} from '@nestjs/axios'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {PrismaService} from './prisma.service'
import {ApiModule} from './api/api.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [HttpModule],
})
export class AppModule {}
