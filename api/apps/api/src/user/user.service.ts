import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { User } from './models/user.model';

@Injectable()
export class UserService {
    @Client({
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3005 }
      })
      client: ClientProxy;


    async findOneByID(id: number): Promise<User> {
        const response = await this.client.send({ cmd: 'findOneById' }, { id });
        return response.toPromise();
      }
}
