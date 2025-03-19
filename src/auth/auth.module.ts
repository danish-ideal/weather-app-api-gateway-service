import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtAuthGuard } from 'src/auth/jwt.auth.gaurd';

@Module({
  imports:[JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configService:ConfigService)=>({
      secret:configService.get<string>('JWT_SECRET_KEY')
    })
  })],
  controllers: [AuthController],
  providers: [AuthService,jwtAuthGuard],
  exports:[AuthService,jwtAuthGuard]
})
export class AuthModule {}
