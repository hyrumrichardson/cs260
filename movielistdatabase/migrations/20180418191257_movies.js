exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('movies', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('poster');
      table.string('completed');
      table.dateTime('created');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('movies'),
  ]);
};
