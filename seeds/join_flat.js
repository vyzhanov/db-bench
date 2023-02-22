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
  console.log('Seeding join_flat...');

  await knex('join_flat_additional').del();
  await knex('join_flat_main').del();

  const total = 155_961; // 500_000

  progress.start(total, 0);

  for (let i = 0; i < total; i++) {
    const [{ id }] = await knex('join_flat_main')
      .returning('id')
      .insert(generateClassic());

    await knex('join_flat_additional').insert(
      Object.entries(generateCustom()).map(([key, value]) => ({
        id,
        key,
        value,
      })),
    );

    progress.update(1 + i);
  }

  progress.stop();
};
