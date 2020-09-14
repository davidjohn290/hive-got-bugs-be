exports.up = function (knex) {
  return knex.schema.createTable("problems", (problemsTable) => {
    problemsTable.increments("problem_id");
    problemsTable.string("title").notNullable;
    problemsTable.text("body").notNullable;
    problemsTable.integer("difficulty").notNullable;
    problemsTable.string("tech").references("tech.slug");
    problemsTable.string("username").references("users.username");
    problemsTable.timestamp("created_at").defaultTo(knex.fn.now());
    problemsTable.string("solved").notNullable;
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("problems");
};
