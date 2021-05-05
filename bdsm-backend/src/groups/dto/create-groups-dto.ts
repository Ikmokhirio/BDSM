import {IsNotEmpty} from "class-validator";

export class CreateGroupsDto {

    @IsNotEmpty()
    name: string;

}