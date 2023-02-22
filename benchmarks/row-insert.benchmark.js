import { add, complete, cycle, save, suite } from 'benny';
import { db } from '../db.js';
import { generateClassic, generateCustom } from '../generators/generators.js';

const testDataClassic = generateClassic();
const testDataCustom = generateCustom();

export default () =>
  suite(
    'Row insert',

    add('Append column', async () => {
      return async () =>
        db('append_column').insert({
          ...testDataClassic,
          ...testDataCustom,
        });
    }),

    add('Join table', async () => {
      return async () => {
        const [{ id }] = await db('join_table_main')
          .returning('id')
          .insert(testDataClassic);

        await db('join_table_additional').insert({
          id: id,
          ...testDataCustom,
        });
      };
    }),

    add('Join flat table', async () => {
      return async () => {
        const [{ id }] = await db('join_flat_main')
          .returning('id')
          .insert(testDataClassic);

        const additionalData = Object.entries(testDataCustom).map(
          ([key, value]) => ({
            id: id,
            key,
            value,
          }),
        );

        await db('table_multi_additional').insert(additionalData);
      };
    }),

    add('JSON', async () => {
      return async () =>
        db('json_object').insert({
          ...testDataClassic,
          custom_fields: testDataCustom,
        });
    }),

    add('JSONB', async () => {
      return async () =>
        db('jsonb_object').insert({
          ...testDataClassic,
          custom_fields: testDataCustom,
        });
    }),

    cycle(),
    complete(),
    save({ file: 'row-insert', details: true, format: 'chart.html' }),
    save({ file: 'row-insert', details: true, format: 'table.html' }),
  );
