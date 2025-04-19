"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1714373451000 = void 0;
class CreateUsersTable1714373451000 {
    name = 'CreateUsersTable1714373451000';
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateUsersTable1714373451000 = CreateUsersTable1714373451000;
//# sourceMappingURL=1743964683917-CreateUsersTable.js.map