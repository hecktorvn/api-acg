const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');

test('It should return JWT token when session created', async ({ assert, client }) => {
	const user = await Factory.model('App/Models/User').create({
		email: 'hecktorvn@hotmail.com',
		password: '162534'
	});

	const response = await client
		.post('/sessions')
		.send({
			email: 'hecktorvn@hotmail.com',
			password: '162534'
		})
		.end();

	//console.log(response);
	response.assertStatus(200);
	assert.exists(response.body.token);
});
