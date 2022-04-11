import {Controller, Get, Query} from '@nestjs/common'
import {AuthService} from '../auth/auth.service'

@Controller('api/login')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Get()
  root(@Query() query: {code: string}) {
    const {code} = query
    return this.authService.login(code)
  }
}
