import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable} from 'typeorm'
import {Targets} from "../../targets/entities/targets.entity";
import {Tasks} from "../../tasks/entities/tasks.entity";
import {Users} from "../../users/entities/users.entity";

@Entity({
    name: "groups"
})
export class Groups {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToMany(() => Targets, targets => targets.groups)
    targets: Targets[]

    @ManyToOne(() => Tasks, task => task.groups)
    @JoinColumn()
    task: Tasks

    @ManyToOne(() => Users, owner => owner.groups)
    owner: Users

    @Column()
    name: string
}