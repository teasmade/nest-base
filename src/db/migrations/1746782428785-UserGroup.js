module.exports = class UserGroup1746782428785 {
  name = 'UserGroup1746782428785';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "user_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a4e957c2cd4a31951d6d656d8b7" UNIQUE ("code"), CONSTRAINT "PK_3c29fba6fe013ec8724378ce7c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_user_groups" ("user_group_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_c1a3a115bfb413e9fbc11121b3f" PRIMARY KEY ("user_group_id", "user_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de59e9515aeba6a8e92a80cf28" ON "user_user_groups" ("user_group_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ff0c267b339b8304649b032ec8" ON "user_user_groups" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_user_groups" ADD CONSTRAINT "FK_de59e9515aeba6a8e92a80cf283" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_user_groups" ADD CONSTRAINT "FK_ff0c267b339b8304649b032ec82" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "user_user_groups" DROP CONSTRAINT "FK_ff0c267b339b8304649b032ec82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_user_groups" DROP CONSTRAINT "FK_de59e9515aeba6a8e92a80cf283"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ff0c267b339b8304649b032ec8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_de59e9515aeba6a8e92a80cf28"`,
    );
    await queryRunner.query(`DROP TABLE "user_user_groups"`);
    await queryRunner.query(`DROP TABLE "user_group"`);
  }
};
