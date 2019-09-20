const { test, trait } = use('Test/Suite')('Company');

trait('Test/ApiClient');
trait('DatabaseTransactions');

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

test('It should return error when email is invalid', async ({ client }) => {
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

    console.log(response);
    response.assertStatus(400);
});
