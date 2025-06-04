/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class WorkflowWorkflowVersion1749044616727 {
  name = 'WorkflowWorkflowVersion1749044616727';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "workflow_version" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" character varying NOT NULL, "description" character varying, "definition" jsonb NOT NULL DEFAULT '{}', "isPublished" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workflowId" uuid, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_e61d12662fd18f475bba2e86b7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workflow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "isPublished" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "activeVersionId" uuid, "createdById" uuid, "updatedById" uuid, CONSTRAINT "REL_3cd52bdfa1d90c759a16630175" UNIQUE ("activeVersionId"), CONSTRAINT "PK_eb5e4cc1a9ef2e94805b676751b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_hashpolicy_enum" RENAME TO "user_hashpolicy_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_hashpolicy_enum" AS ENUM('BCRYPT', 'ARGON2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "hashPolicy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "hashPolicy" TYPE "public"."user_hashpolicy_enum" USING "hashPolicy"::"text"::"public"."user_hashpolicy_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "hashPolicy" SET DEFAULT 'BCRYPT'`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_hashpolicy_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "workflow_version" ADD CONSTRAINT "FK_b00b2f4dd6f51c2997a35f3b267" FOREIGN KEY ("workflowId") REFERENCES "workflow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_version" ADD CONSTRAINT "FK_89d27acbcba9d0df2d1fe4ef533" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_version" ADD CONSTRAINT "FK_ed4120468f689f24c9c00849e88" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow" ADD CONSTRAINT "FK_3cd52bdfa1d90c759a16630175a" FOREIGN KEY ("activeVersionId") REFERENCES "workflow_version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow" ADD CONSTRAINT "FK_0b0de9cf6dda31444bb30bfad41" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow" ADD CONSTRAINT "FK_6bf40e9e4b1a123229519c75fb7" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "workflow" DROP CONSTRAINT "FK_6bf40e9e4b1a123229519c75fb7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow" DROP CONSTRAINT "FK_0b0de9cf6dda31444bb30bfad41"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow" DROP CONSTRAINT "FK_3cd52bdfa1d90c759a16630175a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_version" DROP CONSTRAINT "FK_ed4120468f689f24c9c00849e88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_version" DROP CONSTRAINT "FK_89d27acbcba9d0df2d1fe4ef533"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_version" DROP CONSTRAINT "FK_b00b2f4dd6f51c2997a35f3b267"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_hashpolicy_enum_old" AS ENUM('BCRYPT', 'FASTT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "hashPolicy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "hashPolicy" TYPE "public"."user_hashpolicy_enum_old" USING "hashPolicy"::"text"::"public"."user_hashpolicy_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "hashPolicy" SET DEFAULT 'BCRYPT'`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_hashpolicy_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_hashpolicy_enum_old" RENAME TO "user_hashpolicy_enum"`,
    );
    await queryRunner.query(`DROP TABLE "workflow"`);
    await queryRunner.query(`DROP TABLE "workflow_version"`);
  }
};
