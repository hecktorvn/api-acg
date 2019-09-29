/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CapSchema extends Schema {
    up() {
        this.create('caps', table => {
            table.increments();
            table.string('name').notNullable();
            table.date('date').notNullable();
            table.float('amount', 2, 5).notNullable();
            table.float('amount_paid', 2, 5).defaultTo(0);
            table.string('picture').nullable();
            table.string('description').nullable();
            table
                .integer('status')
                .notNullable()
                .defaultTo(0);
            table.timestamps();
        });
    }

    down() {
        this.drop('caps');
    }
}

module.exports = CapSchema;
