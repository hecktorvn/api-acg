/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
    async index() {
        const users = await User.all();
        return users;
    }

    async store({ request, response }) {
        const data = request.only(['email', 'name', 'password']);

        const user = await User.create(data);

        if (!user) {
            return response
                .status(400)
                .json({ error: 'Erro ao tentar criar o usuário' });
        }

        return user;
    }

    async show({ params }) {
        const user = await User.findOrFail(params.id);
        return user;
    }
}

module.exports = UserController;
