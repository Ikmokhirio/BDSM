import {MigrationInterface, QueryRunner} from "typeorm";

export class targetsFix1620046391238 implements MigrationInterface {
    name = 'targetsFix1620046391238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_60099c8d93dce3a1106b7c97e71"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "target_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "target_id" integer`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_60099c8d93dce3a1106b7c97e71" FOREIGN KEY ("target_id") REFERENCES "targets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
