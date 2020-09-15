const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: {
      database: "hive_got_bugs",
    },
  },

  test: {
    connection: {
      database: "hive_got_bugs_test",
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
