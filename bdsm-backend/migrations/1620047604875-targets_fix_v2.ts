import {MigrationInterface, QueryRunner} from "typeorm";

export class targetsFixV21620047604875 implements MigrationInterface {
    name = 'targetsFixV21620047604875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mails" DROP CONSTRAINT "FK_793324f8abe574c6444356694ee"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_6b7437a443bf91e6a6aa9756f4e"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_5d7af25843377def343ab0beaa8"`);
        await queryRunner.query(`ALTER TABLE "mails" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "task_id"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "taskId" integer`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "mails" ADD CONSTRAINT "FK_fb5f5967e637a50eca5241ae42b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_c1ecde93173c651776130c9f129" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_4d8d8897aef1c049336d8dde13f" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_4d8d8897aef1c049336d8dde13f"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_c1ecde93173c651776130c9f129"`);
        await queryRunner.query(`ALTER TABLE "mails" DROP CONSTRAINT "FK_fb5f5967e637a50eca5241ae42b"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "taskId"`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "owner_id" integer`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "task_id" integer`);
        await queryRunner.query(`ALTER TABLE "mails" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_5d7af25843377def343ab0beaa8" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_6b7437a443bf91e6a6aa9756f4e" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mails" ADD CONSTRAINT "FK_793324f8abe574c6444356694ee" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
