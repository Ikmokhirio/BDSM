import {MigrationInterface, QueryRunner} from "typeorm";

export class usersGroupsRelationship1619901705575 implements MigrationInterface {
    name = 'usersGroupsRelationship1619901705575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "task_id" integer`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_6b7437a443bf91e6a6aa9756f4e" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_9f71bda715870718997ed62f64b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_9f71bda715870718997ed62f64b"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_6b7437a443bf91e6a6aa9756f4e"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "task_id"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
