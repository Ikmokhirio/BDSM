import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Targets} from "../../targets/entities/targets.entity";

@Entity({
    name: "groups"
})
export class Groups {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Targets, target => target.email)
    target: Targets

    @Column()
    name: string
}