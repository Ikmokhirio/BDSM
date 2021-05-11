import {Targets} from "./targets/entities/targets.entity";

export interface jobType {
    targets: Targets[],
    body: string,
    username: string,
    password: string,
}