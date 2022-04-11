import {Module} from '@nestjs/common'
import {AuthModule} from './auth/auth.module'
import {LoginModule} from './login/login.module'
import {LoginController} from './login/login.controller'
import {ApiController} from './api.controller'
import {ApiService} from './api.service'

@Module({
  imports: [AuthModule, LoginModule],
  controllers: [ApiController, LoginController],
  providers: [ApiService],
})
export class ApiModule {}
