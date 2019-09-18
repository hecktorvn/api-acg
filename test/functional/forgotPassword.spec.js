const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Forgot Password');
const { subHours } = require('date-fns');

const Mail = use('Mail');
const Hash = use('Hash');
const Database = use('Database');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('It should return send an email with reset password instructions', async ({ assert, client }) => {
	Mail.fake();

	const email = 'hecktorvn@hotmail.com';

	// CRIANDO USUÁRIO ALEATÓRIO
	const user = await Factory.model('App/Models/User').create({ email });

	// ENVIANDO REQUISIÇÃO PARA A ROTA /FORGOT
	await client.post('/forgot').send({ email }).end();

	// CAPTURANDO O TOKEN GERADO
	const token = await user.tokens().first();

	// CAPTURANDO OS DADOS DO E-MAIL ENVIADO
	const recentEmail = Mail.pullRecent();

	// VERIFICANDO SE O EMAIL FOI REALMENTE ENVIADO PARA O REMETENTE
	assert.equal(recentEmail.message.to[0].address, email);

	// VERIFICANDO SE O TOKEN RETORNADO É O TOKEN DO TIPO CORRETO
	assert.include(token.toJSON(), { type: 'forgotpassword' });

	Mail.restore();
});

// Chama uma rota /reset (token, senha nova, confirmação, senha precisa mudar)
// ele só vai resetar se o token tiver sido criado a menos de 2h
test('It should be able to reset password', async ({ assert, client }) => {
	const email = 'hecktorvn@hotmail.com';
	const password = '123';

	// CRIANDO USUARIO E TOKEN ALEATÓRIO
	const user = await Factory.model('App/Models/User').create({ email });
	const userToken = await Factory.model('App/Models/Token').make();

	// SETANDO O TOKEN NO USUARIO
	await user.tokens().save(userToken);

	// ENVIANDO REQUISIÇÃO PARA A ROTA REST
	const response = await client
		.post('/reset')
		.send({ token: userToken.token, password, password_confirmation: password })
		.end();
	response.assertStatus(204);

	// RE-CARREGANDO OS DADOS DO USUÁRIO
	await user.reload();

	// VERIFICANDO SE A SENHA DO USUÁRIO FOI REALMENTE ALTERADA
	const checkPassword = await Hash.verify(password, user.password);
	assert.isTrue(checkPassword);
});

// Verificando se o token passou 2h sem ser utilizado
test('it cannot reset password after 2h of forgot password request', async ({ request, client }) => {
	const email = 'hecktorvn@hotmail.com';

	// CRIANDO USUARIO E TOKEN ALEATÓRIO
	const user = await Factory.model('App/Models/User').create({ email });
	const userToken = await Factory.model('App/Models/Token').make();

	const dateWhithSub = format(subHours(new Date(), 5), 'yyyy-mm-dd hh:ii:ss');

	await user.tokens().save(userToken);
	Database.table('tokens').where('token', userToken.token).update('created_ad', dateWhithSub);

	await userToken.reload();

	const response = await client
		.post('/reset')
		.send({ token: userToken.token, password, password_confirmation: password })
		.end();

	response.assertStatus(400);
});
