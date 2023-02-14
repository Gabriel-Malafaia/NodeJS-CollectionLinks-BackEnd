import { MigrationInterface, QueryRunner } from "typeorm";

export class descriptionNull1676411216884 implements MigrationInterface {
    name = 'descriptionNull1676411216884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "links" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "links" ALTER COLUMN "description" SET NOT NULL`);
    }

}
