import { Type } from "class-transformer";
import { IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

     class FlagDto{
         @IsString()
         svg:string
 
         @IsString()
         png:string

         @IsOptional()
         @IsString()
         alt:string
     }
  
    
     
export class addCountryDto{

  @IsString()
  name:string

  @IsString()
  userId:string

  
  @IsNumber()
  latitude:number

  @IsNumber()
  longitude:number
 
    @IsObject()
    @ValidateNested()
    @Type(()=>FlagDto)
    flags:FlagDto  
}



