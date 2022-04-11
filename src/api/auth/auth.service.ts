import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {HttpService} from '@nestjs/axios'
import {JwtService} from '@nestjs/jwt'
import {map} from 'rxjs'

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private jwtService: JwtService,
  ) {}

  /**
   * Get Session from code
   *
   * @link https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
   */
  async login(code: string) {
    const APP_ID = this.configService.get<string>('APP_ID')
    const APP_SECRET = this.configService.get<string>('APP_SECRET')
    return this.httpService
      .post(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`,
      )
      .pipe(
        map(response => {
          // TODO: Save to db
          const {session_key, openid} = response.data
          const access_token = this.jwtService.sign({session_key, openid})
          return {access_token}
        }),
      )
  }
}
