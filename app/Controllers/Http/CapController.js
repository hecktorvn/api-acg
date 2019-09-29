/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Cap = use('App/Models/Cap');

/**
 * Resourceful controller for interacting with caps
 */
class CapController {
    /**
     * Show a list of all caps.
     * GET caps
     */
    async index() {
        const caps = await Cap.all();
        return caps;
    }

    /**
     * Create/save a new cap.
     * POST caps
     */
    async store({ response, request }) {
        const data = request.only([
            'name',
            'date',
            'amount',
            'amount_paid',
            'picture',
            'description',
            'status',
        ]);

        const cap = await Cap.create(data);

        if (!cap) {
            return response
                .status(400)
                .json({ error: 'Erro ao tentar criar o CAP' });
        }

        return cap;
    }

    /**
     * Display a single cap.
     * GET caps/:id
     */
    async show({ params }) {
        const cap = Cap.findOrFail(params.id);
        return cap;
    }
}

module.exports = CapController;
