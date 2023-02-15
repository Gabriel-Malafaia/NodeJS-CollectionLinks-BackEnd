import { MigrationInterface, QueryRunner } from "typeorm";

export class beforeRemove1676412761031 implements MigrationInterface {
    name = 'beforeRemove1676412761031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_links" DROP CONSTRAINT "FK_9b64722d7275973ec585059bc4b"`);
        await queryRunner.query(`ALTER TABLE "favorite_links" ADD CONSTRAINT "FK_9b64722d7275973ec585059bc4b" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_links" DROP CONSTRAINT "FK_9b64722d7275973ec585059bc4b"`);
        await queryRunner.query(`ALTER TABLE "favorite_links" ADD CONSTRAINT "FK_9b64722d7275973ec585059bc4b" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
