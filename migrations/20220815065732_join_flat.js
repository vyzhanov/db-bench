import { baseFields } from './common/base.fields.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable('join_flat_main', (table) => {
    baseFields(table);
  });

  await knex.schema.createTable('join_flat_additional', (table) => {
    table.integer('id');
    table.string('key');
    table.string('value');

    table.unique(['id', 'key']);
    table.foreign('id').references('join_flat_main.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTable('join_flat_additional');
  await knex.schema.dropTable('join_flat_main');
};
