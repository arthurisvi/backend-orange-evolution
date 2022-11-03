import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Trails extends BaseSchema {
  protected tableName = 'trails'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').unique().notNullable()
      table.text('description').notNullable()
      table.integer('estimated_time').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
