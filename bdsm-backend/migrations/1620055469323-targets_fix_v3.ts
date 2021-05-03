import {MigrationInterface, QueryRunner} from "typeorm";

export class targetsFixV31620055469323 implements MigrationInterface {
    name = 'targetsFixV31620055469323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "targets_groups_groups" ("targetsId" integer NOT NULL, "groupsId" integer NOT NULL, CONSTRAINT "PK_ed0ab21e5a875d0a399c0a750ba" PRIMARY KEY ("targetsId", "groupsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c1acaa4ee36eed959c612b1d8f" ON "targets_groups_groups" ("targetsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9b72d9d0ff899a15de540cd608" ON "targets_groups_groups" ("groupsId") `);
        await queryRunner.query(`CREATE TABLE "groups_targets_targets" ("groupsId" integer NOT NULL, "targetsId" integer NOT NULL, CONSTRAINT "PK_63bfd825653dc1207f6d12ec3ff" PRIMARY KEY ("groupsId", "targetsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3713b7ea84a6b68fb3cbe25343" ON "groups_targets_targets" ("groupsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6a93e06d6330bca854696f534c" ON "groups_targets_targets" ("targetsId") `);
        await queryRunner.query(`ALTER TABLE "targets_groups_groups" ADD CONSTRAINT "FK_c1acaa4ee36eed959c612b1d8fb" FOREIGN KEY ("targetsId") REFERENCES "targets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "targets_groups_groups" ADD CONSTRAINT "FK_9b72d9d0ff899a15de540cd6087" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_targets_targets" ADD CONSTRAINT "FK_3713b7ea84a6b68fb3cbe25343c" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_targets_targets" ADD CONSTRAINT "FK_6a93e06d6330bca854696f534c4" FOREIGN KEY ("targetsId") REFERENCES "targets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups_targets_targets" DROP CONSTRAINT "FK_6a93e06d6330bca854696f534c4"`);
        await queryRunner.query(`ALTER TABLE "groups_targets_targets" DROP CONSTRAINT "FK_3713b7ea84a6b68fb3cbe25343c"`);
        await queryRunner.query(`ALTER TABLE "targets_groups_groups" DROP CONSTRAINT "FK_9b72d9d0ff899a15de540cd6087"`);
        await queryRunner.query(`ALTER TABLE "targets_groups_groups" DROP CONSTRAINT "FK_c1acaa4ee36eed959c612b1d8fb"`);
        await queryRunner.query(`DROP INDEX "IDX_6a93e06d6330bca854696f534c"`);
        await queryRunner.query(`DROP INDEX "IDX_3713b7ea84a6b68fb3cbe25343"`);
        await queryRunner.query(`DROP TABLE "groups_targets_targets"`);
        await queryRunner.query(`DROP INDEX "IDX_9b72d9d0ff899a15de540cd608"`);
        await queryRunner.query(`DROP INDEX "IDX_c1acaa4ee36eed959c612b1d8f"`);
        await queryRunner.query(`DROP TABLE "targets_groups_groups"`);
    }

}
