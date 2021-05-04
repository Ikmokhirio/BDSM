import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn} from 'typeorm'
import {Groups} from "../../groups/entities/groups.entity";
import {Mails} from "../../mails/entities/mails.entity";

@Entity({
    name: "tasks"
})
export class Tasks {

    @PrimaryGeneratedColumn()
    id: string;

    @OneToMany(() => Groups, groups => groups.task)
    @JoinColumn()
    groups: Groups[];

    @OneToOne(() => Mails, mail => mail.task)
    @JoinColumn()
    mail: Mails

    @Column()
    finished: boolean

    @Column()
    currentIndex: number

    @Column({
        default: "Stopped"
    })
    status: string

}