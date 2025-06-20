/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class MessagingTemplatesSends1750421047621 {
  name = 'MessagingTemplatesSends1750421047621';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TYPE "public"."message_template_channel_enum" AS ENUM('sms', 'email')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."message_template_status_enum" AS ENUM('draft', 'active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "message_template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "category" character varying, "tags" jsonb, "channel" "public"."message_template_channel_enum" NOT NULL, "status" "public"."message_template_status_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL DEFAULT '1', "smsContent" text, "emailHtmlContent" text, "emailTextContent" text, "emailSubject" text, "providerTemplateId" character varying, "variables" jsonb NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid, "updatedById" uuid, CONSTRAINT "UQ_332cce35545f88fa6a69a56d185" UNIQUE ("name"), CONSTRAINT "PK_616800da109c721fb4dd2019a9b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."message_send_status_enum" AS ENUM('pending', 'sent', 'delivered', 'failed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "message_send" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."message_send_status_enum" NOT NULL DEFAULT 'pending', "recipientEmail" character varying, "recipientPhone" character varying, "recipientName" character varying, "recipientOasisId" character varying, "templateData" jsonb NOT NULL, "renderedContent" text NOT NULL, "providerMessageId" character varying, "providerResponse" character varying, "errorMessage" character varying, "retryCount" integer NOT NULL DEFAULT '0', "scheduledAt" TIMESTAMP, "sentAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "triggerMetadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "templateId" uuid, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_6f1f7e6a89d0ba12422d9e94777" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_template" ADD CONSTRAINT "FK_63a1a9af02507d575c5b22dd1a3" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_template" ADD CONSTRAINT "FK_ee18f9855faf851039db0f40d2d" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_send" ADD CONSTRAINT "FK_e97ac49dd792c084a3160492950" FOREIGN KEY ("templateId") REFERENCES "message_template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_send" ADD CONSTRAINT "FK_85b886e90a916c11e6a16e49e0b" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_send" ADD CONSTRAINT "FK_6affe9055f70ee852c854fec6de" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "message_send" DROP CONSTRAINT "FK_6affe9055f70ee852c854fec6de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_send" DROP CONSTRAINT "FK_85b886e90a916c11e6a16e49e0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_send" DROP CONSTRAINT "FK_e97ac49dd792c084a3160492950"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_template" DROP CONSTRAINT "FK_ee18f9855faf851039db0f40d2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_template" DROP CONSTRAINT "FK_63a1a9af02507d575c5b22dd1a3"`,
    );
    await queryRunner.query(`DROP TABLE "message_send"`);
    await queryRunner.query(`DROP TYPE "public"."message_send_status_enum"`);
    await queryRunner.query(`DROP TABLE "message_template"`);
    await queryRunner.query(
      `DROP TYPE "public"."message_template_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."message_template_channel_enum"`,
    );
  }
};
