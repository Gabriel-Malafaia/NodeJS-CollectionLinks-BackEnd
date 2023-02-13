import { MigrationInterface, QueryRunner } from "typeorm";

export class newEntityAttributtes1675803185848 implements MigrationInterface {
    name = 'newEntityAttributtes1675803185848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_links" DROP CONSTRAINT "FK_76bad9bfacce54691f7ca6cf97b"`);
        await queryRunner.query(`ALTER TABLE "favorite_links" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "favorite_links" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "favorite_links" DROP COLUMN "favorite_links_id"`);
        await queryRunner.query(`ALTER TABLE "favorite_links" ADD "link_id" uuid`);
        await queryRunner.query(`ALTER TABLE "favorite_links" ADD CONSTRAINT "FK_9b64722d7275973ec585059bc4b" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_links" DROP CONSTRAINT "FK_9b64722d7275973ec585059bc4b"`);
        await queryRunner.query(`ALTER TABLE "favorite_links" DROP COLUMN "link_id"`);
        await queryRunner.query(`ALTER TABLE "favorite_links" ADD "favorite_links_id" uuid`);
        await queryRunner.query(`ALTER TABLE "favorite_links" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "favorite_links" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "favorite_links" ADD CONSTRAINT "FK_76bad9bfacce54691f7ca6cf97b" FOREIGN KEY ("favorite_links_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
