import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne} from 'typeorm'
import {Groups} from "../../groups/entities/groups.entity";
import {Mails} from "../../mails/entities/mails.entity";

@Entity({
    name: "tasks"
})
export class Tasks {

    @PrimaryGeneratedColumn()
    id: string;

    @OneToMany(() => Groups, groups => groups.task)
    groups: Groups[];

    @OneToOne(() => Mails, mail => mail.task)
    mail: Mails

    @Column()
    finished : boolean
}