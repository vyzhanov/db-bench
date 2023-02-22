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
  console.log('Seeding jsonb_object...');

  await knex('jsonb_object').del();

  const total = 500_000;
  const delimiter = 200;

  progress.start(total, 0);

  for (let i = 0; i < total / delimiter; i++) {
    await knex('jsonb_object').insert(generateRows(delimiter));

    progress.update(delimiter * (1 + i));
  }

  progress.stop();
};

const generateRows = (count) => {
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push({
      ...generateClassic(),
      custom_fields: generateCustom(),
    });
  }
  return rows;
};
