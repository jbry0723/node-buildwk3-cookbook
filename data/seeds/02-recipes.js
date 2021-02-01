
exports.seed = function(knex) {
return knex('recipes').insert([
        {recipe_name: 'Buttered Toast'}, 
        {recipe_name: 'Chocolate Cake'}, 
        {recipe_name: 'Roasted Pecans'} 
      ]);
    
};
