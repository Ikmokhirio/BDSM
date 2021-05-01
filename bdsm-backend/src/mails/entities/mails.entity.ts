import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne} from 'typeorm'
import {Users} from "../../users/entities/users.entity";
import {Tasks} from "../../tasks/entities/tasks.entity";

@Entity({
    name: "mails"
})
export class Mails {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Users, user => user.mails)
    user: Users

    @OneToOne(() => Tasks, task => task.mail)
    task: Tasks

    @Column()
    body: string

    @Column()
    attachments: string
}