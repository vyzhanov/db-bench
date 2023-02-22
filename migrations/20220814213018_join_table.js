import { baseFields } from './common/base.fields.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable('join_table_main', (table) => {
    baseFields(table);
  });

  await knex.schema.createTable('join_table_additional', (table) => {
    table.integer('id');
    table.string('custom01', 255);
    table.string('custom02', 255);
    table.string('custom03', 255);
    table.string('custom04', 255);
    table.string('custom05', 255);
    table.string('custom06', 255);
    table.string('custom07', 255);
    table.string('custom08', 255);
    table.string('custom09', 255);
    table.string('custom10', 255);
    table.string('custom11', 255);
    table.string('custom12', 255);
    table.string('custom13', 255);
    table.string('custom14', 255);
    table.string('custom15', 255);
    table.string('custom16', 255);
    table.string('custom17', 255);
    table.string('custom18', 255);
    table.string('custom19', 255);
    table.string('custom20', 255);
    table.string('custom21', 255);
    table.string('custom22', 255);
    table.string('custom23', 255);
    table.string('custom24', 255);
    table.string('custom25', 255);
    table.string('custom26', 255);
    table.string('custom27', 255);
    table.string('custom28', 255);
    table.string('custom29', 255);
    table.string('custom30', 255);
    table.string('custom31', 255);
    table.string('custom32', 255);
    table.string('custom33', 255);
    table.string('custom34', 255);
    table.string('custom35', 255);
    table.foreign('id').references('join_table_main.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTable('join_table_additional');
  await knex.schema.dropTable('join_table_main');
};
