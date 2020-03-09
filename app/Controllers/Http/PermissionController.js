'use strict'

const Permission = use('Permission')

class PermissionController {
  async index ({ request }) {
    const { page } = request.get()

    const permissions = await Permission.query().paginate(page)

    return permissions
  }

  async store ({ request }) {
    const data = request.only(['name', 'slug', 'description'])

    const permission = await Permission.create(data)

    return permission
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'slug', 'description'])

    const permission = await Permission.findOrFail(params.id)

    permission.merge(data)

    await permission.save()

    return permission
  }

  async destroy ({ params }) {
    const permission = await Permission.findOrFail(params.id)

    await permission.delete()
  }
}

module.exports = PermissionController
