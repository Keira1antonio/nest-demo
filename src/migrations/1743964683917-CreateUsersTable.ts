import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1714373451000 implements MigrationInterface {
  name = 'CreateUsersTable1714373451000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "email" varchar(50) UNIQUE NOT NULL,
        "name" varchar(50) NOT NULL,
        "password" varchar(20) NOT NULL,
        "address" text NOT NULL,
        "phone" bigint NOT NULL,
        "country" varchar(50) NOT NULL,
        "city" varchar(50) NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
