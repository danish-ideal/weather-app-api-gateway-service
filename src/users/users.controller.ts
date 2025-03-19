import { Body, Controller, Get, Post, Res, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dtos/create-user.dto';
import { loginUserDto } from './dtos/login-user.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  createUser(@Body() createUserDto:createUserDto){
   return this.usersService.createUser(createUserDto)
  }

  @Post('login')
 async loginUser(@Body() loginUserDto:loginUserDto, @Res ({passthrough:true}) res:any){
    const  {refresh_token,...data}= await this.usersService.loginUser(loginUserDto)
    res.cookie('refresh_token',refresh_token,{
      httpOnly:true,
      sameSite:'strict',
      path:'/'
    })
    return data
  }
  @Get('logout')
  logoutUser(@Res({passthrough:true}) res:any){
       res.clearCookie('refresh_token',{path:'/'})
       return true
  }
}
