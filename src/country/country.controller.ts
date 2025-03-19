import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { addCountryDto } from './dtos/country.dto';
import { jwtAuthGuard } from 'src/auth/jwt.auth.gaurd';

@Controller('country')
@UseGuards(jwtAuthGuard)
export class CountryController {
  constructor(private readonly countryService: CountryService) {
  }
  
  @Get('/:countryName')
 async getCountries(@Param('countryName') countryName:string){
  return await this.countryService.fetchCountries(countryName)
  }

  @Post('add')
  addCountry(@Body() addCountryDto:addCountryDto){
    return this.countryService.addcountry(addCountryDto)
  }
  @Get('fetch/user/countries/:id')
  fetchUserCountries(@Param('id') id:string){
  return this.countryService.fetchUserCountries(id)
  }
}
