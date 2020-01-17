import { Injectable, Inject } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DatabaseConfigService } from "./database-config.service";
import { User } from "../user/entities/user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService){
        // console.log(configService.host);
    }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3305,
      username: 'root',
      password: 'root',
      database: 'store',
      entities: [User],
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}