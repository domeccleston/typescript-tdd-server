
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {name: "TV", price: 1000},
        {name: "Laptop", price: 2500},
        {name: "Car", price: 10000}
      ]);
    });
};
