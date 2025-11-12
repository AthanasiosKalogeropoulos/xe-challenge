import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Ad extends BaseModel {
  @column({ isPrimary: true })
  public id?: number

  @column()
  public user_id?: number

  @column()
  public title?: string

  @column()
  public description?: string

  @column()
  public price?: number

  @column()
  public place_id?: string

  @column()
  public place_main_text?: string

  @column()
  public place_secondary_text?: string

  @column.dateTime({ autoCreate: true })
  public createdAt?: DateTime

  @belongsTo(() => User)
  declare public user: BelongsTo<typeof User>
}
