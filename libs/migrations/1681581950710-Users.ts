import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { generateHashPassword } from "../../helpers/password";

export class Users1681581950710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "uuid",
            isNullable: false,
            generationStrategy: "uuid",
            default: "uuid_generate_v4",
          },
          {
            name: "email",
            isNullable: false,
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "firstName",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "lastName",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
        ],
      })
    );
    await queryRunner.manager.query(`
      INSERT INTO public.users(email, fullName,lastName, password)
	    VALUES ('reza@gmail.com','Reza','Bahadori','${await generateHashPassword(
        "1234"
      )}' ,true);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
