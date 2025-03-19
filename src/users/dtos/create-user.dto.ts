import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class createUserDto{

    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password:string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    confirmPassword:string
}