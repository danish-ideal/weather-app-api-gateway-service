import { GatewayTimeoutException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { addCountryDto } from './dtos/country.dto';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { getCountryWithWeather } from './helper';
import { count } from 'console';

@Injectable()
export class CountryService {

   weatherApi:string = this.configService.get<string>('WEATHER_API')||''
constructor(@Inject('COUNTRY_SERVICE' ) private readonly countryService:ClientProxy, private configService:ConfigService){}

async fetchCountries(countryName:string){
  try {
   const result =  await axios.get(`${this.configService.get<string>('COUNTRY_API')}${countryName}`)
   return result.data
  } catch (error) {
    throw new HttpException('Country does not exist',HttpStatus.BAD_REQUEST)
  }
  
  }

async addcountry(country:addCountryDto){
try {
  
   let result =  await firstValueFrom(this.countryService.send({cmd:'add_country'},country))
   
   return await getCountryWithWeather(result,this.weatherApi) 
} catch (error) {
  
    throw new GatewayTimeoutException(error)
}
  }

  async fetchUserCountries(id:string){
    try {

      let result = await firstValueFrom(this.countryService.send({cmd:'fetch_user_countries'},id));
      let  countriesWithWeather:any = await Promise.all(
        result.map(async (country)=> await getCountryWithWeather(country,this.weatherApi) )
      )
      return countriesWithWeather
    } catch (error) {
      throw new GatewayTimeoutException(`Connection to country service is interrupted ${error.message}`)
    }
  }
}
