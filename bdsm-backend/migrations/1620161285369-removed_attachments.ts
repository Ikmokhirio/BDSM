import {MigrationInterface, QueryRunner} from "typeorm";

export class removedAttachments1620161285369 implements MigrationInterface {
    name = 'removedAttachments1620161285369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "attachments"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "status" character varying NOT NULL DEFAULT 'Stopped'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "mails" ADD "attachments" character varying NOT NULL`);
    }

}
