exports.seed = function(knex) {

      return knex('instructions').insert([
        {recipe_id:1,instruction_text:'Put bread in toaster', step_number:1},
        {recipe_id:1,instruction_text:'Spread butter on bread', step_number:2},
        {recipe_id:1,instruction_text:'Eat the toast!', step_number:3},
        {recipe_id:2,instruction_text:'Mix cake ingredients', step_number:1},
        {recipe_id:2,instruction_text:'Bake the cake', step_number:2},
        {recipe_id:2,instruction_text:'Eat the cake!', step_number:3}
      ]);
    
};