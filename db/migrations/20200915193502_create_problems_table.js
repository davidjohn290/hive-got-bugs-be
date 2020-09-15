exports.up = function (knex) {
  return knex.schema.createTable("problems", (problemsTable) => {
    problemsTable.increments("problem_id").primary();
    problemsTable.timestamp("created_at").defaultTo(knex.fn.now());
    problemsTable.string("username").notNullable().references("users.username");
    problemsTable.integer("difficulty").notNullable();
    problemsTable.string("solved").notNullable();
    problemsTable.string("tech").notNullable().references("tech.slug");
    problemsTable.string("title").notNullable();
    problemsTable.text("body").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("problems");
};
