import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UpdateUserPasswordColumn1744672102511 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
