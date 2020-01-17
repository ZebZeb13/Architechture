import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export enum UserError {
    NOT_FOUND = 'NOT_FOUND',
    EXIST = 'EXIST',
    LOGIN = 'LOGIN',
}

export class UserErrorException extends RpcException {
    constructor(type: UserError) {

        let content = 'User error';
        switch (type) {
            case UserError.NOT_FOUND:
                content = 'User not found';
                break;

            case UserError.EXIST:
                content = 'User already exist';
                break;

            case UserError.LOGIN:
                content = 'Invalid username/password';
                break;

            default:
                break;
        }
        super(content);
    }
}
