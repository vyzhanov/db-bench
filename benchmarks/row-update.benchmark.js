import { add, complete, cycle, save, suite } from 'benny';
import { db } from '../db.js';
import { generateRowClassic } from '../generators/row-classic.generator.js';
import { generateRowJson } from '../generators/row-json.generator.js';

const randomNumber = (min = 1, max = 500000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomString = Math.random().toString(36).substring(7);

export default () =>
  suite(
    'Row update',

    add('Append column', async () => {
      await db.raw(`
        UPDATE append_column
        SET custom12 = '${randomString}'
        WHERE id = ${randomNumber()}
      `);
    }),

    add('Join table', async () => {
      await db.raw(`
        UPDATE join_table_main
        SET custom12 = '${randomString}'
        WHERE id = ${randomNumber()}
      `);
    }),

    add('Join flat table', async () => {
      await db.raw(`
        UPDATE join_flat_additional
        SET value = '${randomString}'
        WHERE id = ${randomNumber()}
        AND key = 'custom12'
      `);
    }),

    add('JSON (|| syntax)', async () => {
      await db.raw(`
        UPDATE json_object
        SET custom_fields = custom_fields || '{"custom12":"${randomString}"}'
        WHERE id = ${randomNumber()}
      `);
    }),

    add('JSON (JSONB_SET syntax)', async () => {
      await db.raw(`
        UPDATE json_object
        SET custom_fields = JSONB_SET(custom_fields, '{custom12}', '"${randomString}"')
        WHERE id = ${randomNumber()}
      `);
    }),

    add('JSON (PG14 syntax)', async () => {
      await db.raw(`
        UPDATE json_object
        SET custom_fields['custom12'] = '"${randomString}"'
        WHERE id = ${randomNumber()}
      `);
    }),

    add('JSONB (|| syntax)', async () => {
      await db.raw(`
        UPDATE jsonb_object
        SET custom_fields = custom_fields || '{"custom12":"${randomString}"}'
        WHERE id = ${randomNumber()}
      `);
    }),

    add('JSONB (JSONB_SET syntax)', async () => {
      await db.raw(`
        UPDATE jsonb_object
        SET custom_fields = JSONB_SET(custom_fields, '{custom12}', '"${randomString}"')
        WHERE id = ${randomNumber()}
      `);
    }),

    add('JSONB (PG14 syntax)', async () => {
      await db.raw(`
        UPDATE jsonb_object
        SET custom_fields['custom12'] = '"${randomString}"'
        WHERE id = ${randomNumber()}
      `);
    }),

    cycle(),
    complete(),
    save({ file: 'row-update', details: true, format: 'chart.html' }),
    save({ file: 'row-update', details: true, format: 'table.html' }),
  );
