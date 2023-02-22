// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    database: 'benchmark',
    user: 'icfcusr',
    password: 'password',
  },
  pool: { min: 1, max: 1, propagateCreateError: false },
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};
