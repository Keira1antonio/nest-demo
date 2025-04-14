"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prueba1743727658281 = void 0;
class Prueba1743727658281 {
    async up(queryRunner) {
        queryRunner.query(`CREATE TABLE TEST (id SERIAL PRIMARY KEY)`);
    }
    async down(queryRunner) {
        queryRunner.query(`DROP TABLE TEST`);
    }
}
exports.Prueba1743727658281 = Prueba1743727658281;
//# sourceMappingURL=1743727658281-prueba.js.map