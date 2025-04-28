
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
    return knex.schema
        .createTable('users', table => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('email').unique().notNullable();
            table.string('password_hash').notNullable();
            table.timestamps(true, true);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
    return knex.schema
        .dropTable('users');
};
