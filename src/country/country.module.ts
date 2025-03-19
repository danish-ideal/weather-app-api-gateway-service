import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[ClientsModule.register([
    {
      name:'COUNTRY_SERVICE',
      transport:Transport.TCP,
      options:{port:3002}
    }
  ]),AuthModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
