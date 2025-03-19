import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports:[ClientsModule.register([
    {
      name:'USER_SERVICE',
      transport:Transport.TCP,
      options:{port:3001}

    },
   
  ]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule  {
}
