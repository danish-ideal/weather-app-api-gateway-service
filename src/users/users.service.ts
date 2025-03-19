import { BadGatewayException, GatewayTimeoutException, HttpException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createUserDto } from './dtos/create-user.dto';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { loginUserDto } from './dtos/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(@Inject('USER_SERVICE') private readonly userService:ClientProxy,private readonly authService:AuthService){}
    async createUser(userData: createUserDto) {
        try {
         return await firstValueFrom(this.userService.send({cmd:'create_user'},userData))
        } catch (error) {
           if(error.statusCode==409) throw new InternalServerErrorException(error.message)
          throw new GatewayTimeoutException('User service connection failed');
        }
      }

     async loginUser(userData:loginUserDto){
      try {
        let user:{id:string,email:string,name:string} =  await firstValueFrom(this.userService.send({cmd:'login_user'},userData))
            let tokens =  this.authService.generateTokens(user)
            return {...user,...tokens}
      } catch (error) {
        if(error.statusCode) throw new InternalServerErrorException({statusCode:error.statusCode,message:error.message});
       throw new GatewayTimeoutException('User service connection failed');
      }
     } 
    }
