import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';


interface RequestWithCookies extends Request{
  cookies:{refresh_token:string}
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    
  }
  generateTokens(userPayload){
     return this.authService.generateTokens(userPayload)
  }
  @Get('refresh_token')
  verifyAndUpdateAcessToken(@Req () req:RequestWithCookies){
    return this.authService.verifyAndUpdateAcessToken(req.cookies.refresh_token)  
  }
}
