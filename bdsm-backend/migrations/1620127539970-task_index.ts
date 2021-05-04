import {MigrationInterface, QueryRunner} from "typeorm";

export class taskIndex1620127539970 implements MigrationInterface {
    name = 'taskIndex1620127539970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "currentIndex" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "currentIndex"`);
    }

}
