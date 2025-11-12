import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      fullName: 'John Doe',
      email: 'john@xe.gr',
      password: '123456',
    })
    await User.create({
      fullName: 'Αθανάσιος Καλογεροπουλος',
      email: 'thanasis@xe.gr',
      password: 'root',
    })
  }
}
