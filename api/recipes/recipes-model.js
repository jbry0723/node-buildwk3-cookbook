const db = require('../../data/db-config');


module.exports = {
  getRecipes,
  getShoppingList,
  getInstructions
};

function getRecipes(){
    return db('recipes')
}



function getShoppingList(recipe_id){
    return db('recipe_ingredients as il')
    .leftJoin('ingredients as i','il.ingredient_id','i.ingredient_id')
    .select('i.ingredient_name', 'il.quantity', 'il.quantity_units')
    .where('il.recipe_id', recipe_id)
}



function getInstructions(recipe_id){
    return db('instructions as i')
    .select('i.instruction_text','i.step_number')
    .orderBy('i.step_number','asc')
    .where('i.recipe_id',recipe_id)
}

// select r.recipe_name from ingredients_lists il
// left join recipes r
// on  il.recipe_id=r.recipe_id
// where ingredient_id=4

