const db = require('../../data/db-config');


module.exports = {
    getRecipeByIngredient
  };

function getRecipeByIngredient(recipe_id){
    return db ('ingredients_lists as il')
    .leftJoin('recipes as r', 'il.recipe_id','r.recipe_id')
    .select('r.recipe_name')
    .where('il.ingredient_id', recipe_id)
    
}