/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class WorkflowSoftDelete1749053186362 {
    name = 'WorkflowSoftDelete1749053186362'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workflow_version" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "workflow" ADD "deletedAt" TIMESTAMP`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workflow" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "workflow_version" DROP COLUMN "deletedAt"`);
    }
}
