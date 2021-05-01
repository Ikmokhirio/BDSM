import {MigrationInterface, QueryRunner} from "typeorm";

export class tasksGroupsEmailsRelationship1619901232178 implements MigrationInterface {
    name = 'tasksGroupsEmailsRelationship1619901232178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "task_id" integer`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_6b7437a443bf91e6a6aa9756f4e" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_6b7437a443bf91e6a6aa9756f4e"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "task_id"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
