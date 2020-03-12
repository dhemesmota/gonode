const { test, trait, afterEach } = use('Test/Suite')('User registration')

const User = use('App/Models/User')

trait('Test/ApiClient')

afterEach(async () => {
  await User.query().delete()
})

test('criar um usuário', async ({ client, assert }) => {
  const response = await client.post('/users').send({
    username: 'Dhemes',
    email: 'dhemes.mota@gmail.com',
    password: '123456',
    password_confirmation: '123456'
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: 'Dhemes',
    email: 'dhemes.mota@gmail.com'
  })

  const user = await User.findBy('username', 'Dhemes')

  assert.equal(user.toJSON().email, 'dhemes.mota@gmail.com')
})
/*
test('não criar um novo usuário', async ({ client, assert }) => {
  const response = await client.post('/users').end()

  response.assertStatus(400)
  const user = await User.findBy('email', 'dhemes.mota@gmail.com')
  assert.isNull(user)
})
*/
test('atualizar dados do usuário', async ({ client, assert }) => {
  const response = await client.post('/users').send({
    username: 'Dhemes',
    email: 'dhemes.mota@gmail.com',
    password: '123456',
    password_confirmation: '123456'
  }).end()

  response.assertStatus(200)

  const user = await User.findBy('email', 'dhemes.mota@gmail.com')

  user.merge({
    email: 'dhemes@gmail.com'
  })

  await user.save()

  assert.equal(user.toJSON().email, 'dhemes@gmail.com')
})
