const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('It should return JWT token when session created', async ({
    assert,
    client,
}) => {
    const sessionPayload = {
        email: 'hecktorvn@hotmail.com',
        password: '162534',
    };

    await Factory.model('App/Models/User').create(sessionPayload);
    const response = await client
        .post('/sessions')
        .send(sessionPayload)
        .end();

    // console.log(response);
    response.assertStatus(200);
    assert.exists(response.body.token);
});
