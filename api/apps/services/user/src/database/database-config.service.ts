import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
    constructor(private configService: ConfigService){}

        
    get host(): string {
        return this.configService.get('database.host');
    }

    get port(): number {
        return Number(this.configService.get('database.port'));
    }
}
