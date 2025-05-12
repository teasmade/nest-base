/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class UserHashPolicy1747041752331 {
    name = 'UserHashPolicy1747041752331'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_hashpolicy_enum" AS ENUM('BCRYPT', 'ARGON2')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hashPolicy" "public"."user_hashpolicy_enum" NOT NULL DEFAULT 'BCRYPT'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashPolicy"`);
        await queryRunner.query(`DROP TYPE "public"."user_hashpolicy_enum"`);
    }
}
