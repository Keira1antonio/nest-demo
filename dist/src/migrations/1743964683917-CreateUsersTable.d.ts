import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateUsersTable1714373451000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
