'use strict';

class SessionController {
	async store({ request, response, auth }) {
		// CAPTURANDO O EMAIL E O PASSWORD RECEBIDO
		const { email, password } = request.only([ 'email', 'password' ]);

		// VALIDANDO O EMAIL E A SENHA E GERANDO TOKEN
		const { token } = await auth.attempt(email, password);
		return { token };
	}
}

module.exports = SessionController;
