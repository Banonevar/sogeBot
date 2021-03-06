import { MigrationInterface, QueryRunner } from 'typeorm';

export class registryAlertAnimationDuration1592557005200 implements MigrationInterface {
  name = 'registryAlertAnimationDuration1592557005200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "alert_follow" ADD "animationInDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_follow" ADD "animationOutDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_sub" ADD "animationInDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_sub" ADD "animationOutDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_subcommunitygift" ADD "animationInDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_subcommunitygift" ADD "animationOutDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_subgift" ADD "animationInDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_subgift" ADD "animationOutDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_host" ADD "animationInDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_host" ADD "animationOutDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_raid" ADD "animationInDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_raid" ADD "animationOutDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_tip" ADD "animationInDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_tip" ADD "animationOutDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_cheer" ADD "animationInDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_cheer" ADD "animationOutDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_resub" ADD "animationInDuration" integer NOT NULL DEFAULT 2000`);
    await queryRunner.query(`ALTER TABLE "alert_resub" ADD "animationOutDuration" integer NOT NULL DEFAULT 2000`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "alert_resub" DROP COLUMN "animationOutDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_resub" DROP COLUMN "animationInDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_cheer" DROP COLUMN "animationOutDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_cheer" DROP COLUMN "animationInDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_tip" DROP COLUMN "animationOutDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_tip" DROP COLUMN "animationInDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_raid" DROP COLUMN "animationOutDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_raid" DROP COLUMN "animationInDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_host" DROP COLUMN "animationOutDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_host" DROP COLUMN "animationInDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_subgift" DROP COLUMN "animationOutDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_subgift" DROP COLUMN "animationInDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_subcommunitygift" DROP COLUMN "animationOutDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_subcommunitygift" DROP COLUMN "animationInDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_sub" DROP COLUMN "animationOutDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_sub" DROP COLUMN "animationInDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_follow" DROP COLUMN "animationOutDuration"`);
    await queryRunner.query(`ALTER TABLE "alert_follow" DROP COLUMN "animationInDuration"`);
  }

}
