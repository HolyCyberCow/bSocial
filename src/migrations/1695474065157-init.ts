import { MigrationInterface, QueryRunner } from "typeorm";

export class init1695474065157 implements MigrationInterface {
  name = "init1695474065157 ";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "username" character varying NOT NULL,"email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "unique_user_email" UNIQUE ("email"), CONSTRAINT "PK_user" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "content" character varying NOT NULL, "userId" uuid, CONSTRAINT "unique_post_title" UNIQUE ("title"), CONSTRAINT "PK_post" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_to_users" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_to_users"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP INDEX "public"."email_index"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
