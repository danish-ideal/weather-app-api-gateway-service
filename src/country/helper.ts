import { HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { addCountryDto } from "./dtos/country.dto";
import {format} from 'date-fns'

export async function getCountryWithWeather (country:addCountryDto,weatherApi:string){
    console.log(country,weatherApi);
    
     let weatherDetails = await axios.get(`${weatherApi}`,{
        params:{
          latitude:country.latitude,
          longitude:country.longitude,
          current_weather:true
        }
      });
      
      if(!weatherDetails) return new HttpException('Weather details is not available',HttpStatus.INTERNAL_SERVER_ERROR)
        console.log(weatherDetails.data);
        
        const currentweather = weatherDetails.data.current_weather
    console.log(currentweather);
    
      const {temperature,windspeed,is_day,time} = currentweather
      const formatedTime = format(new Date(time),'HH:mm:ss')
      const countryWithWeather ={
        ...country,
        temperature,
        windspeed,
        is_day,
     formatedTime
      }
      return countryWithWeather
}