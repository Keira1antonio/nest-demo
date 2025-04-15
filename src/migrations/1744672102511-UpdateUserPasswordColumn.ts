import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserPasswordColumn1744672102511
  implements MigrationInterface
{
  name = 'UpdateUserPasswordColumn1744672102511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Modificar directamente la columna existente
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(60)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir los cambios a la configuración anterior
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(20)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`,
    );
  }
}
