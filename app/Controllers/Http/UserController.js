'use strict'

// Quando for modulos do adonis pode usar o use() se não usa require
const User = use('App/Models/User')
// Para usar transacion, recomendado usar sempre que tiver mais de uma ação no banco de dados
const Database = use('Database')

class UserController {
  async store ({ request }) {
    const { permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles'
    ])
    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)
    if (addresses) {
      await user.addresses().createMany(addresses, trx)
    }

    await trx.commit()

    if (roles) {
      await user.roles().attach(roles)
    }

    if (permissions) {
      await user.permissions().attach(permissions)
    }

    await user.loadMany(['roles', 'permissions', 'addresses'])

    return user
  }

  async update ({ request, params }) {
    const { permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles'
    ])
    const addresses = request.input('addresses')

    const user = await User.findOrFail(params.id)

    user.merge(data)

    await user.save()

    if (addresses) {
      await user.addresses().createMany(addresses)
    }

    if (roles) {
      await user.roles().sync(roles)
    }

    if (permissions) {
      await user.permissions().sync(permissions)
    }

    await user.loadMany(['roles', 'permissions', 'addresses'])

    return user
  }
}

module.exports = UserController
