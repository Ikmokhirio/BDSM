import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Targets} from "../../targets/entities/targets.entity";
import {Tasks} from "../../tasks/entities/tasks.entity";
import {Users} from "../../users/entities/users.entity";

@Entity({
    name: "groups"
})
export class Groups {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Targets, target => target.groups)
    target: Targets

    @ManyToOne(() => Tasks, task => task.groups)
    task: Tasks

    @ManyToOne(() => Users, user => user.groups)
    owner: Users

    @Column()
    name: string
}