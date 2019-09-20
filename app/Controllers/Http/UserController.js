/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
    async store({ request, response }) {
        const { email, name, password } = request.only([
            'email',
            'name',
            'password',
        ]);

        const user = await User.create({ email, name, password });

        if (!user) {
            return response
                .status(400)
                .json({ error: 'Erro ao tentar criar o usuário' });
        }

        return response.json(user.toJSON());
    }
}

module.exports = UserController;
