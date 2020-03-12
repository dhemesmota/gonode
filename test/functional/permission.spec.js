const { test, trait, afterEach } = use('Test/Suite')('Permission registration')

const User = use('App/Models/User')
const Permission = use('Permission')

trait('Test/ApiClient')
trait('Auth/Client')

afterEach(async () => {
  await User.query().delete()
  await Permission.query().delete()
})

test('criar uma permissão', async ({ client }) => {
  const user = await User.create({
    username: 'Dhemes',
    email: 'dhemes.mota@gmail.com',
    password: '123456'
  })

  const response = await client.post('/permissions').loginVia(user).send({
    name: 'Read task',
    slug: 'read_task',
    description: 'Description projects'
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'Read task',
    slug: 'read_task',
    description: 'Description projects'
  })
})
