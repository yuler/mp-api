import {Test, TestingModule} from '@nestjs/testing'
import {HttpModule} from '@nestjs/axios'
import {ConfigModule} from '@nestjs/config'
import {ApiController} from './api.controller'
import {ApiService} from './api.service'
import {PrismaService} from '../../src/prisma.service'

describe('ApiController', () => {
  let controller: ApiController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        HttpModule.registerAsync({
          useFactory: () => ({
            timeout: 5000,
            maxRedirects: 5,
          }),
        }),
      ],
      controllers: [ApiController],
      providers: [ApiService, PrismaService],
    }).compile()

    controller = module.get<ApiController>(ApiController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
