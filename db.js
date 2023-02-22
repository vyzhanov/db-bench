import knex from 'knex';
import dbConfig from './knexfile.js';

export const db = knex(dbConfig);
