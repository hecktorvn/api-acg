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

    async show({ response, params }) {
        try{
            const user = await User.findOrFail(params.id);
            return user;
        } catch(error){
            return response
                .status(400)
                .json({ error: 'O usuário não foi encontrado!' });
        }
    }
}

module.exports = UserController;
