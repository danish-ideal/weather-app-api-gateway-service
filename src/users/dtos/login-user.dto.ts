import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class loginUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}