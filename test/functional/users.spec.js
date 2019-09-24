const { test, trait } = use('Test/Suite')('Users');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('It should add the user on database', async ({ assert, client }) => {
    const user = {
        name: 'Hecktor viegas do nascimento',
        email: 'hecktorvn@hotmail.com',
        password: '162534',
        password_confirmation: '162534',
    };

    const response = await client
        .post('/users')
        .send(user)
        .end();

    response.assertStatus(200);
    assert.exists(response.body.id);
});

test('It should return error when trying to add the user and email is invalid', async ({
    client,
}) => {
    const user = {
        name: 'Hecktor viegas do nascimento',
        email: 'hecktorvn',
        password: '162534',
        password_confirmation: '162534',
    };

    const response = await client
        .post('/users')
        .send(user)
        .end();

    response.assertStatus(400);
});

test('It should return error when no have authentication token', async ({
    client,
}) => {
    const response = await client.get('/users').end();
    response.assertStatus(401);
});

test('It should return the users list', async ({ client, assert }) => {
    const user = await Factory.model('App/Models/User').create();
    await Factory.model('App/Models/User').create();

    const response = await client
        .get('/users')
        .loginVia(user, 'jwt')
        .end();

    response.assertStatus(200);
    assert.isArray(response.body);
});
