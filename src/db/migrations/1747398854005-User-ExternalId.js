/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class UserExternalId1747398854005 {
    name = 'UserExternalId1747398854005'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "externalId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."user_hashpolicy_enum" RENAME TO "user_hashpolicy_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_hashpolicy_enum" AS ENUM('BCRYPT', 'FASTT')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "hashPolicy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "hashPolicy" TYPE "public"."user_hashpolicy_enum" USING "hashPolicy"::"text"::"public"."user_hashpolicy_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "hashPolicy" SET DEFAULT 'BCRYPT'`);
        await queryRunner.query(`DROP TYPE "public"."user_hashpolicy_enum_old"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_hashpolicy_enum_old" AS ENUM('BCRYPT', 'ARGON2')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "hashPolicy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "hashPolicy" TYPE "public"."user_hashpolicy_enum_old" USING "hashPolicy"::"text"::"public"."user_hashpolicy_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "hashPolicy" SET DEFAULT 'BCRYPT'`);
        await queryRunner.query(`DROP TYPE "public"."user_hashpolicy_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_hashpolicy_enum_old" RENAME TO "user_hashpolicy_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "externalId"`);
    }
}
