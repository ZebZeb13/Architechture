import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';


export enum UserRole {
    ADMIN = 'admin',
    DEVELOPER = 'developer',
}


@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    registeredAt: number;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;

    @Column({
        type: 'text',
    })
    firstName: string;

    @Column({
        type: 'text',
    })
    lastName: string;

    @Column({
        unique: true,
    })
    email: string;

    @Exclude()
    @Column('text')
    password: string;

    // @Column('simple-array')
    @Column({
        type: 'set',
        enum: UserRole,
        default: [],
    })
    roles: UserRole[];

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    toResponseObject(showToken: boolean = true) {
        const { id, registeredAt, updatedAt, email, firstName, lastName, roles } = this;

        const responseObject = {
            id,
            registeredAt,
            updatedAt,
            email,
            firstName,
            lastName,
            roles,
        };

        return responseObject;
    }
}
