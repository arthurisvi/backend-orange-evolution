import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contents extends BaseSchema {
  protected tableName = 'contents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('title').notNullable()
      table.string('type').notNullable()
      table.string('duration').notNullable()
      table.string('link').notNullable()
      table.string('author').notNullable()
      table.string('trail_id').unsigned().references('trails.id').nullable()
      table.enum('category', ['initial', 'basicConcepts', 'optional'])
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
