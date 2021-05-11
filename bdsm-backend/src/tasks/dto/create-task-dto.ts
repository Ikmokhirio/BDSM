import {IsArray, IsNotEmpty} from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    body: string;

    @IsArray()
    @IsNotEmpty()
    groupsIds: [number]

}