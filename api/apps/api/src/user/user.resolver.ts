import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { IdArgs } from './dto/id.args';
import { User } from './models/user.model';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService,
      ) { }
    @Query(() => User)
    async user(@Args() { id }: IdArgs): Promise<User> {
      return this.userService.findOneByID(id);
    }
}
