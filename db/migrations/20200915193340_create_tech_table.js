exports.up = function (knex) {
  return knex.schema.createTable("tech", (techTable) => {
    techTable.string("slug").primary();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tech");
};
