module.exports = class User1746613053035 {
    name = 'User1746613053035'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_enabled"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_anon"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isEnabled" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isAnon" boolean NOT NULL DEFAULT false`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAnon"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isEnabled"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_anon" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_enabled" boolean NOT NULL DEFAULT true`);
    }
}
