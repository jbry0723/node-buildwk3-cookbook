const pg = require("pg");
const localConnection =
  "postgresql://postgres:pgAdminPass@localhost/recipesbook";

let connection;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
  connection = process.env.DATABASE_URL;
} else {
  connection = localConnection;
}

const sharedConfig = {
  
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  }
};

module.exports = {
  development: { client:"sqlite3",useNullAsDefault: true, connection: "./data/recipebook.db3",...sharedConfig },
  production: { ...sharedConfig,client: "pg",
  connection, pool: { min: 2, max: 10 } },
};
