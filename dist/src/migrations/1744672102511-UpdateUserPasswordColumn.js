"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserPasswordColumn1744672102511 = void 0;
class UpdateUserPasswordColumn1744672102511 {
    name = 'UpdateUserPasswordColumn1744672102511';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(60)`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(20)`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    }
}
exports.UpdateUserPasswordColumn1744672102511 = UpdateUserPasswordColumn1744672102511;
//# sourceMappingURL=1744672102511-UpdateUserPasswordColumn.js.map