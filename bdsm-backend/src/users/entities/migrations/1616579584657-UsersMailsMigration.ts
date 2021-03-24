import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersMailsMigration1616579584657 implements MigrationInterface {
    name = 'UsersMailsMigration1616579584657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mails" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "attachments" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_218248d7dfe1b739f06e2309349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mails" ADD CONSTRAINT "FK_793324f8abe574c6444356694ee" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mails" DROP CONSTRAINT "FK_793324f8abe574c6444356694ee"`);
        await queryRunner.query(`DROP TABLE "mails"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
