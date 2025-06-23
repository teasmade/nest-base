/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class WorkflowMappings1750671251255 {
  name = 'WorkflowMappings1750671251255';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "workflow_mapping" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "label" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workflowId" uuid, CONSTRAINT "PK_e589a7148c0c741be7e60318e40" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_mapping" ADD CONSTRAINT "FK_9aec4d7745c5b0f379516e39520" FOREIGN KEY ("workflowId") REFERENCES "workflow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "workflow_mapping" DROP CONSTRAINT "FK_9aec4d7745c5b0f379516e39520"`,
    );
    await queryRunner.query(`DROP TABLE "workflow_mapping"`);
  }
};
