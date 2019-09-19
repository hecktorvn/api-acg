class SessionController {
    async store({ request, auth }) {
        // CAPTURANDO O EMAIL E O PASSWORD RECEBIDO
        const { email, password } = request.only(['email', 'password']);

        // VALIDANDO O EMAIL E A SENHA E GERANDO TOKEN
        const { token } = await auth.attempt(email, password);
        return { token };
    }
}

module.exports = SessionController;
