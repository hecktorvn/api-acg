'use strict';

const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Mail = use('Mail');
const Env = use('Env');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class ForgotPasswordController {
	async store({ request }) {
		// CAPTURANDO O EMAIL RECEBIDO
		const email = request.input('email');

		// CAPTURANDO O USUARIO NO BANCO DE DADOS
		const user = await User.findByOrFail('email', email);

		// GERANDO O TOKEN
		const random = await promisify(randomBytes)(16);
		const token = random.toString('hex');

		// SALVANDO O TOKEN
		await user.tokens().create({
			token,
			type: 'forgotpassword'
		});

		// CAPTURANDO A URL ATUAL DO FRONTEND
		const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

		// ENVIANDO O EMAIL PARA O USUÁRIO
		await Mail.send('emails.forgotPassword', { name: user.name, token, resetPasswordUrl }, (message) => {
			message.to(user.email).from('hecktorvn@hotmail.com').subject('App ACG - Recuperação e Senha');
		});
	}
}

module.exports = ForgotPasswordController;
