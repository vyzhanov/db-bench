import { add, complete, cycle, save, suite } from 'benny';
import { db } from '../db.js';

const searchPattern = 'f0e4c2f76c5891677cb66bb8eccc9316';

export default () =>
  suite(
    'Where equal',

    add('Append column', async () => {
      return db.raw(`
        SELECT id FROM append_column
        WHERE custom11 = '${searchPattern}'
      `);
    }),

    add('Join table', async () => {
      return db.raw(`
        SELECT join_table_main.id
        FROM join_table_main
        LEFT JOIN join_table_additional ON join_table_main.id = join_table_additional.id
        WHERE join_table_additional.custom11 = '${searchPattern}'
      `);
    }),

    add('Join flat table', async () => {
      return db.raw(`
        SELECT join_flat_main.id FROM join_flat_main
        LEFT JOIN join_flat_additional ON join_flat_main.id = join_flat_additional.id
        WHERE join_flat_additional.key = 'custom10'
        AND join_flat_additional.value = '${searchPattern}'
      `);
    }),

    add('JSON columns', async () => {
      return db.raw(`
        SELECT id FROM json_object
        WHERE custom_fields ->> 'custom10' = '${searchPattern}'
      `);
    }),

    add('JSONB columns (=)', async () => {
      return db.raw(`
        SELECT id FROM jsonb_object
        WHERE custom_fields ->> 'custom10' = '${searchPattern}'
      `);
    }),

    add('JSONB columns (@> with convert)', async () => {
      return db.raw(`
        SELECT id FROM jsonb_object
        WHERE custom_fields @> '{ "custom10": "${searchPattern}"}'::jsonb
      `);
    }),

    add('JSONB columns (@> w/o convert)', async () => {
      return db.raw(`
        SELECT id FROM jsonb_object
        WHERE custom_fields @> '{ "custom10": "${searchPattern}"}'
      `);
    }),

    add('JSONB columns (index) (=)', async () => {
      return db.raw(`
        SELECT id FROM jsonb_object_index
        WHERE custom_fields ->> 'custom10' = '${searchPattern}'
      `);
    }),

    add('JSONB columns (index) (@> with convert)', async () => {
      return db.raw(`
        SELECT id FROM jsonb_object_index
        WHERE custom_fields @> '{ "custom10": "${searchPattern}"}'::jsonb
      `);
    }),

    add('JSONB columns (index) (@> w/o convert)', async () => {
      return db.raw(`
        SELECT id FROM jsonb_object_index
        WHERE custom_fields @> '{ "custom10": "${searchPattern}"}'
      `);
    }),

    cycle(),
    complete(),
    save({ file: 'where-equal', details: true, format: 'chart.html' }),
    save({ file: 'where-equal', details: true, format: 'table.html' }),
  );
