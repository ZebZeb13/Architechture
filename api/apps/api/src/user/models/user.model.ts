import { ObjectType, Field, registerEnumType, Int } from 'type-graphql';
// import { Category } from '../../category/entities/category.entity';

export enum UserRole {
    ADMIN = 'admin',
    DEVELOPER = 'developer',
}

registerEnumType(UserRole, { name: 'UserRole', description: 'user roles' });

@ObjectType()
export class User {

    @Field(() => Int!)
    id: number;

    @Field(() => Date!)
    registeredAt: number;

    @Field(() => Date!)
    updatedAt: number;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field(() => [UserRole])
    roles: UserRole[];

    // @Field(() => [Category], { nullable: true })
    // categories: Category[];
}
