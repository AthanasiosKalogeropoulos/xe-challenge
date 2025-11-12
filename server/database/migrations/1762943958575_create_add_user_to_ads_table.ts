import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddUserToAds extends BaseSchema {
  protected tableName = 'ads'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_id')
    })
  }
}