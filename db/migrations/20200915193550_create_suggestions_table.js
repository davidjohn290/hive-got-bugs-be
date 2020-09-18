exports.up = function (knex) {
  return knex.schema.createTable("suggestions", (suggestionsTable) => {
    suggestionsTable.increments("suggestion_id").primary();
    suggestionsTable
      .integer("problem_id")
      .notNullable()
      .references("problems.problem_id")
      .onDelete("cascade");
    suggestionsTable.timestamp("created_at").defaultTo(knex.fn.now());
    suggestionsTable
      .string("username")
      .notNullable()
      .references("users.username");
    suggestionsTable.string("approved_by");
    suggestionsTable.text("body").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("suggestions");
};
