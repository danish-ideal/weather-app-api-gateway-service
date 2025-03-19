import { HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { addCountryDto } from "./dtos/country.dto";
import {format} from 'date-fns'

export async function getCountryWithWeather (country:addCountryDto,weatherApi:string){
    
     let weatherDetails = await axios.get(`${weatherApi}`,{
        params:{
          latitude:country.latitude,
          longitude:country.longitude,
          current_weather:true
        }
      });
      
      if(!weatherDetails) return new HttpException('Weather details is not available',HttpStatus.INTERNAL_SERVER_ERROR)
        
        const currentweather = weatherDetails.data.current_weather 
      const {temperature,windspeed,is_day} = currentweather
      const countryWithWeather ={
        ...country,
        temperature,
        windspeed,
        is_day,
           }
      return countryWithWeather
}