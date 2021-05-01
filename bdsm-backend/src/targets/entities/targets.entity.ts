import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import {Groups} from "../../groups/entities/groups.entity";

@Entity({
    name: "targets"
})
export class Targets {

    @PrimaryGeneratedColumn()
    id: string;

    @OneToMany(() => Groups, groups => groups.name)
    groups: Groups[];


    @Column()
    email: string
}