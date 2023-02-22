import cliProgress from 'cli-progress';
import { generateClassic, generateCustom } from '../generators/generators.js';

const progress = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic,
);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  console.log('Seeding join_table...');

  await knex('join_table_additional').del();
  await knex('join_table_main').del();

  const total = 500_000;

  progress.start(total, 0);

  for (let i = 0; i < total; i++) {
    const [{ id }] = await knex('join_table_main')
      .returning('id')
      .insert(generateClassic());

    await knex('join_table_additional').insert({
      id: id,
      ...generateCustom(),
    });

    progress.update(1 + i);
  }

  progress.stop();
};
