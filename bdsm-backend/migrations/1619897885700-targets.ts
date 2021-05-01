import {MigrationInterface, QueryRunner} from "typeorm";

export class targets1619897885700 implements MigrationInterface {
    name = 'targets1619897885700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "targets" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_87084f49e9de9dd6a3e83906584" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "targets"`);
    }

}
