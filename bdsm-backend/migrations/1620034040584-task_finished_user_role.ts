import {MigrationInterface, QueryRunner} from "typeorm";

export class taskFinishedUserRole1620034040584 implements MigrationInterface {
    name = 'taskFinishedUserRole1620034040584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "finished" boolean NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'User'`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "task_id" integer`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "owner_id" integer`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_6b7437a443bf91e6a6aa9756f4e" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_5d7af25843377def343ab0beaa8" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_5d7af25843377def343ab0beaa8"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_6b7437a443bf91e6a6aa9756f4e"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "task_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
