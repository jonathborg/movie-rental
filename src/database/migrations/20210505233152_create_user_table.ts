import { Knex } from 'knex';

const TABLE_NAME = 'user';

export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(TABLE_NAME);

    if (!exists) {
        await knex.schema.createTable(TABLE_NAME, (table) => {
            table.increments('id').primary();
            table.string('name', 100).notNullable();
            table.string('email', 100).notNullable();
            table.string('cpf', 11).unique();
            table.enum('gender', ['male', 'female']).notNullable();
            table.date('birth_date').notNullable();
            table.index('cpf', 'cpf_index', 'FULLTEXT');
            table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.timestamp('updated_at').nullable().defaultTo(null);
            table.timestamp('deleted_at').nullable().defaultTo(null);
        });
    }
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}
