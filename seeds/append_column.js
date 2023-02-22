import cliProgress from 'cli-progress';
import { generateRowClassic } from '../generators/generators.js';

const progress = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic,
);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  console.log('Seeding append_column...');

  await knex('append_column').del();

  const total = 500_000;
  const delimiter = 200;

  progress.start(total, 0);

  for (let i = 0; i < total / delimiter; i++) {
    await knex('append_column').insert(generateRows(delimiter));

    progress.update(delimiter * (1 + i));
  }

  progress.stop();
};

const generateRows = (count) => {
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(generateRowClassic());
  }
  return rows;
};
