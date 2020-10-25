import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class addUserIdMessage1603590057164 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('post',new TableColumn({
      name:'user_id',
      type:'uuid',
      isNullable:true,
    }),
    );

    await queryRunner.createForeignKey('post', new TableForeignKey({
      name:'postUser',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName:'users',
      onDelete:'SET NULL', // o que vai acontecer com os agendamentos dessse usuario caso ele seja deletado no sistema
      onUpdate:'CASCADE'// caso alguma informaçã ocomo o ID for alterado essa informação reflita nos relacionamentos
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('post', 'postUser');
    await queryRunner.dropColumn('post','user_id');
  }

}
