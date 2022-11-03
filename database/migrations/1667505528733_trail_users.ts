import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TrailUsers extends BaseSchema {
  protected tableName = 'trail_user'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.integer('trail_id').unsigned().references('trails.id')
      table.enum('status', ['notStarted', 'inProgress', 'finished']).defaultTo('notStarted')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
