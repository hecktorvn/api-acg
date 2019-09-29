const { test, trait } = use('Test/Suite')('Cap');
const { format } = require('date-fns');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('It should add the cap on database', async ({ assert, client }) => {
    const cap = {
        name: 'Conta de Luz',
        date: format(new Date(), 'yyyy-MM-dd'),
        amount: 350.36,
    };

    const user = await Factory.model('App/Models/User').create();
    const response = await client
        .post('/caps')
        .loginVia(user, 'jwt')
        .send(cap)
        .end();

    response.assertStatus(200);
    assert.exists(response.body.id);
});

test('It should return the all caps', async ({ assert, client }) => {
    const user = await Factory.model('App/Models/User').create();
    await Factory.model('App/Models/Cap').create();
    await Factory.model('App/Models/Cap').create();

    const response = await client
        .get(`/caps`)
        .loginVia(user, 'jwt')
        .end();

    response.assertStatus(200);

    assert.isArray(response.body);
});

test('It should return the cap to code send', async ({ assert, client }) => {
    const user = await Factory.model('App/Models/User').create();
    const cap = await Factory.model('App/Models/Cap').create();

    const response = await client
        .get(`/caps/${cap.id}`)
        .loginVia(user, 'jwt')
        .end();
    response.assertStatus(200);

    assert.include(response.body, { id: cap.id });
});
