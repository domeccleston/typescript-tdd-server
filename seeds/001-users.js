
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: 'Dom', last_name: 'Eccleston'},
        {first_name: 'Steve', last_name: 'Eccleston'},
        {first_name: 'Frances', last_name: 'Eccleston'},
      ]);
    });
};
