import {MigrationInterface, QueryRunner} from "typeorm";

export class initialState1620037062875 implements MigrationInterface {
    name = 'initialState1620037062875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "targets" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_87084f49e9de9dd6a3e83906584" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "role" character varying NOT NULL DEFAULT 'User', "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mails" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "attachments" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_218248d7dfe1b739f06e2309349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "finished" boolean NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "target_id" integer, "task_id" integer, "owner_id" integer, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mails" ADD CONSTRAINT "FK_793324f8abe574c6444356694ee" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_60099c8d93dce3a1106b7c97e71" FOREIGN KEY ("target_id") REFERENCES "targets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_6b7437a443bf91e6a6aa9756f4e" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_5d7af25843377def343ab0beaa8" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_5d7af25843377def343ab0beaa8"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_6b7437a443bf91e6a6aa9756f4e"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_60099c8d93dce3a1106b7c97e71"`);
        await queryRunner.query(`ALTER TABLE "mails" DROP CONSTRAINT "FK_793324f8abe574c6444356694ee"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "mails"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "targets"`);
    }

}
