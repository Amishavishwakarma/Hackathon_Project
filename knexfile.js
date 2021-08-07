// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'heckathon',
      user:     'root',
      password: 'Nav@gur1',
      host: 'localhost'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
