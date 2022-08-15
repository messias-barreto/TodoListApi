import { MigrationInterface, QueryRunner } from "typeorm";

export class default1660437510394 implements MigrationInterface {
    name = 'default1660437510394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "works" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "works" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "works" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "works" DROP COLUMN "created_at"`);
    }

}
