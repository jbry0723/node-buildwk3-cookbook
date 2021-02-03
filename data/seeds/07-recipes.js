
exports.seed = function(knex) {
return knex('recipes').insert([
        {recipe_name: 'Buttered Toast', category_id:1,creator_id:1 }, 
        {recipe_name: 'Chocolate Cake', category_id:2,creator_id:2}, 
        {recipe_name: 'Roasted Pecans', category_id:1,creator_id:1} 
      ]);
    
};
