import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { ConfigService } from './services/config.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    ConfigService,
    // {
    //   provide: 'AUTH_SERVICE',
    //   useFactory: (configService: ConfigService) => {
    //     return ClientProxyFactory.create(configService.getAuthSvcOptions());
    //   },
    //   inject: [ConfigService]
    // }
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.getUserSvcOptions());
      },
      inject: [ConfigService]
    },
  ],
})
export class AppModule {}
