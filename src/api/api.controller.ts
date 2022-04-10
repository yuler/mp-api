import {HttpService} from '@nestjs/axios'
import {Controller, Get, Query} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {Observable, map} from 'rxjs'

@Controller('api')
export class ApiController {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  /**
   * Get Session from code
   *
   * @link https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
   */
  @Get('/login')
  login(@Query() query: {code: string}): Observable<any> {
    const {code} = query
    const APP_ID = this.configService.get<string>('APP_ID')
    const APP_SECRET = this.configService.get<string>('APP_SECRET')
    return this.httpService
      .post(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`,
      )
      .pipe(
        map(response => {
          const {session_key, openid} = response.data
          // TODO: return jwt
        }),
      )
  }
}
