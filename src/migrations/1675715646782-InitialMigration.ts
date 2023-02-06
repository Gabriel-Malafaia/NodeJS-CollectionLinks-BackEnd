import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1675715646782 implements MigrationInterface {
    name = 'InitialMigration1675715646782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(72) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(65) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_ecf17f4a741d3c5ba0b4c5ab4b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_links_links" ("usersId" uuid NOT NULL, "linksId" uuid NOT NULL, CONSTRAINT "PK_049b1aee64aea0dd2106d50f88c" PRIMARY KEY ("usersId", "linksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_26e6e76d5c19a9fd2fb96b4aad" ON "users_links_links" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_09a144e4ba3b8ff818ee32046c" ON "users_links_links" ("linksId") `);
        await queryRunner.query(`ALTER TABLE "users_links_links" ADD CONSTRAINT "FK_26e6e76d5c19a9fd2fb96b4aadb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_links_links" ADD CONSTRAINT "FK_09a144e4ba3b8ff818ee32046cf" FOREIGN KEY ("linksId") REFERENCES "links"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_links_links" DROP CONSTRAINT "FK_09a144e4ba3b8ff818ee32046cf"`);
        await queryRunner.query(`ALTER TABLE "users_links_links" DROP CONSTRAINT "FK_26e6e76d5c19a9fd2fb96b4aadb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_09a144e4ba3b8ff818ee32046c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26e6e76d5c19a9fd2fb96b4aad"`);
        await queryRunner.query(`DROP TABLE "users_links_links"`);
        await queryRunner.query(`DROP TABLE "links"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
