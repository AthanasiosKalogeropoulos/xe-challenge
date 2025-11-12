import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Ads extends BaseSchema {
  protected tableName = 'ads'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.text('description').nullable()
      table.decimal('price', 12, 2).nullable()
      table.string('place_id', 255).notNullable()
      table.string('place_main_text', 255).nullable()
      table.string('place_secondary_text', 255).nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
