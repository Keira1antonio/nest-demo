import { MigrationInterface, QueryRunner } from 'typeorm';

export class Prueba1743727658281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`CREATE TABLE TEST (id SERIAL PRIMARY KEY)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE TEST`);
  }
}
