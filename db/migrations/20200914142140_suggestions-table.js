exports.up = function (knex) {
  return knex.schema.createTable("suggestions", (suggestionsTable) => {
    suggestionsTable.increments("suggestion_id");
    suggestionsTable.integer("problem_id").references("problems.problem_id");
    suggestionsTable.text("body").notNullable;
    suggestionsTable.string("username").references("users.username");
    suggestionsTable.string("approved_by").notNullable;
    suggestionsTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("suggestions");
};
