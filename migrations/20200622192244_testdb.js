exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments();
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
    })
    .createTable("products", (table) => {
      table.increments();
      table.decimal("price").notNullable();
      table.string("name", 1000).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("products");
};