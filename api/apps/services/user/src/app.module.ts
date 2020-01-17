import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { DatabaseConfigService } from './database/database-config.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';


@Module({
  imports: [ConfigModule.forRoot({load: [configuration]}), DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService, DatabaseConfigService],
})
export class AppModule { }
