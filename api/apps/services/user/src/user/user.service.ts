import { Injectable, HttpException, HttpStatus, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, getRepository } from 'typeorm';

import { User, UserRole } from './entities/user.entity';
import { UserErrorException, UserError } from './exception/error.exception';
import FindInterface from './interfaces/find.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async read(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async findOneByID(id: number) {
    const user = await this.userRepository.findOne(id, {
    });
    if (!user) {
      throw new UserErrorException(UserError.NOT_FOUND);
    }
    return user;
  }

  async find({ page, pageSize, search, sortingColumn, sortingDirection }: FindInterface) {
    let req = getRepository(User).createQueryBuilder('user').select('user').take(pageSize).skip(pageSize * (page));
    if (search) {
      const searchColumn = ['id', 'firstName', 'lastName', 'email'];
      searchColumn.forEach((column, index) => {
        const whereCondition = 'user.' + column + ' like :search';
        const whereParameteres = { search: '%' + search + '%' };
        if (index === 0) {
          req = req.where(whereCondition, whereParameteres);
        } else {
          req = req.orWhere(whereCondition, whereParameteres);
        }
      });
    }
    if (sortingColumn && sortingDirection) {
      req = req.orderBy('user.' + sortingColumn, sortingDirection.toUpperCase() === 'ASC' ? 'ASC' : 'DESC');
    }
    const users = await req.getMany();
    const totalCount = await req.getCount();
    return { users, totalCount };
  }


  async update(user: User, firstName?: string, lastName?: string) {
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    return await this.userRepository.save(user);
  }

  async updateRoles(user: User, roles: UserRole[]) {
    user.roles = roles;
    return await this.userRepository.save(user);
  }


  async remove(user: User) {
    return this.userRepository.remove(user);
  }

  async removeByIDs(ids: number[]) {
    if (ids.length > 0) {
      const users = await this.userRepository.find({
        where: {
          id: In(ids),
        },
      });
      if (!users) {
        throw new UserErrorException(UserError.NOT_FOUND);
      }
      return this.userRepository.remove(users);
    }
    return false;
  }
}
