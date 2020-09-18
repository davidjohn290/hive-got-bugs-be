exports.up = function (knex) {
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username").primary();
    usersTable.timestamp("created_at").defaultTo(knex.fn.now());
    usersTable.string("name").notNullable();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("online_status").notNullable();
    usersTable.integer("bug_points").notNullable();
    usersTable.integer("bug_points_over_month").notNullable();
    usersTable.string("role").notNullable();
    usersTable.text("description");
    usersTable.string("github_url");
    usersTable.string("skill1");
    usersTable.string("skill2");
    usersTable.string("skill3");
    usersTable.string("skill4");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
