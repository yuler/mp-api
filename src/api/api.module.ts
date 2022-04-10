import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {ApiController} from './api.controller'
import {ApiService} from './api.service'
import {PrismaService} from '../prisma.service'
import {HttpModule} from '@nestjs/axios'

@Module({
  imports: [
    ConfigModule,
    // TODO: ConfigModule
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService, PrismaService],
})
export class ApiModule {}
