import {Module} from '@nestjs/common'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import {HttpModule} from '@nestjs/axios'
import {AuthService} from './auth.service'
import {JwtStrategy} from './jwt.strategy'
import {ConfigService} from '@nestjs/config'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: configService.get<string>('JWT_EXPIRES')},
      }),
    }),
    HttpModule, // TODO: Move Global Module
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
