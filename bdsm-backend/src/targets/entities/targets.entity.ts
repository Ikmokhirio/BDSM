import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import {Groups} from "../../groups/entities/groups.entity";

@Entity({
    name: "targets"
})
export class Targets {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToMany(() => Groups, groups => groups.targets)
    @JoinTable()
    groups: Groups[];

    @Column()
    email: string
}