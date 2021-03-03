import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity({
    name: "users"
})
export class Users {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        unique: true,
        nullable: false
    })
    username: string;

    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        nullable: true
    })
    avatar: string
}