import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CountryModule } from './country/country.module';


@Module({
  imports: [UsersModule, AuthModule,ConfigModule.forRoot({
    isGlobal:true
  }), CountryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
