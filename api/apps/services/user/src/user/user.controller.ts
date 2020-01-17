import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import FindInterface from './interfaces/find.interface';
import { ResultTableOutput } from './dto/resultTable.output';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @MessagePattern({ cmd: 'findOneById' })
    async findOnById(@Payload() { id }: { id: number }): Promise<User> {
      return this.userService.findOneByID(id);
    }
  
    @MessagePattern({ cmd: 'find' })
    async find(@Payload() { page, pageSize, search, sortingColumn, sortingDirection }: FindInterface): Promise<ResultTableOutput> {
      return await this.userService.find({ page, pageSize, search, sortingColumn, sortingDirection });
    }
}
