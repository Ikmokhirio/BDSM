import {MigrationInterface, QueryRunner} from "typeorm";

export class fixMails1620162829829 implements MigrationInterface {
    name = 'fixMails1620162829829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mails" ADD "taskId" integer`);
        await queryRunner.query(`ALTER TABLE "mails" ADD CONSTRAINT "UQ_1933ec25a4da6bc168dc34b1981" UNIQUE ("taskId")`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "mailId" integer`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "UQ_4f080c4275487e94d693c650e1c" UNIQUE ("mailId")`);
        await queryRunner.query(`ALTER TABLE "mails" ADD CONSTRAINT "FK_1933ec25a4da6bc168dc34b1981" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_4f080c4275487e94d693c650e1c" FOREIGN KEY ("mailId") REFERENCES "mails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_4f080c4275487e94d693c650e1c"`);
        await queryRunner.query(`ALTER TABLE "mails" DROP CONSTRAINT "FK_1933ec25a4da6bc168dc34b1981"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "UQ_4f080c4275487e94d693c650e1c"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "mailId"`);
        await queryRunner.query(`ALTER TABLE "mails" DROP CONSTRAINT "UQ_1933ec25a4da6bc168dc34b1981"`);
        await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "taskId"`);
    }

}
