import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659151625194 implements MigrationInterface {
    name = 'default1659151625194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" text NOT NULL, "login" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "admin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "works" ("id" character varying NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "PK_a9ffbf516ba6e52604b29e5cce0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" character varying NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "status" boolean NOT NULL DEFAULT false, "work_id" character varying NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "works" ADD CONSTRAINT "FK_8fb7128aeef9dc826489805eb18" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_3f827094e7c46e73412f9b08059" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_3f827094e7c46e73412f9b08059"`);
        await queryRunner.query(`ALTER TABLE "works" DROP CONSTRAINT "FK_8fb7128aeef9dc826489805eb18"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "works"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
