'use strict'

// Quando for modulos do adonis pode usar o use() se não usa require
const User = use('App/Models/User')
// Para usar transacion, recomendado usar sempre que tiver mais de uma ação no banco de dados
const Database = use('Database')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)
    await user.addresses().createMany(addresses, trx)

    await trx.commit()

    return user
  }
}

module.exports = UserController
