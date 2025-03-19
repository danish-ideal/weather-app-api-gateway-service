import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(private readonly jwtService:JwtService ){}
    generateTokens(payload:{id:string,email:string,name:string}){
        return {
          access_token:this.jwtService.sign(payload,{expiresIn:'15m'}),
          refresh_token:this.jwtService.sign(payload,{expiresIn:'7d'})
        }

    }
    verifyAndUpdateAcessToken(refresh_token:string){
      let {id,email,name}= this.jwtService.verify(refresh_token)
      let access_token = this.jwtService.sign({id,email},{expiresIn:'15m'})
      return {id,email,access_token,name}
    }
    verifyToken(token:string){
      try {
        return this.jwtService.verify(token)
      } catch (error) {
        throw new Error('invalid token')
      }
     
    }
}
