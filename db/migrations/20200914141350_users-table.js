exports.up = function (knex) {
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username").primary();
    usersTable.string("name").notNullable;
    usersTable.string("online_status").notNullable;
    usersTable.string("typeOfUser").notNullable;
    usersTable.integer("bug_points").notNullable;
    usersTable.integer("bug_points_over_month").notNullable;
    usersTable.string("skills1");
    usersTable.string("skills2");
    usersTable.string("skills3");
    usersTable.string("skills4");
    usersTable.string("github_url");
    usersTable.text("description");
    usersTable.string("avatar_url");
    usersTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
