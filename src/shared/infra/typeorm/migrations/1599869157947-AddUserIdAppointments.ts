import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export  default class AddUserIdAppointments1599869157947 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('appointments',new TableColumn({
      name:'user_id',
      type:'uuid',
      isNullable:true,
    }),
    );

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name:'appointmentUser',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName:'users',
      onDelete:'SET NULL', // o que vai acontecer com os agendamentos dessse usuario caso ele seja deletado no sistema
      onUpdate:'CASCADE'// caso alguma informaçã ocomo o ID for alterado essa informação reflita nos relacionamentos
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'appointmentProvider');
    await queryRunner.dropColumn('appointments','user_id');
  }
}
