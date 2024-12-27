import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigra1735267490516 implements MigrationInterface {
    name = 'Newmigra1735267490516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "school_class" ("id" character varying NOT NULL, "schoolClassName" character varying NOT NULL, CONSTRAINT "PK_c2db13fe0f6e127a4aae70bfd35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "schoolClassId" character varying NOT NULL, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_1f1c23decbdde9e509a4f7d753d" FOREIGN KEY ("schoolClassId") REFERENCES "school_class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_1f1c23decbdde9e509a4f7d753d"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "school_class"`);
    }

}
