import { baseFields } from './common/base.fields.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.createTable('jsonb_object_index', (table) => {
    baseFields(table);

    table.jsonb('custom_fields');
    table.index('custom_fields', 'idx_custom_fields', 'gin');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.dropTable('jsonb_object');
};
