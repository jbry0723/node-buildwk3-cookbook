const db = require('../../data/db-config');


module.exports = {
    getIngredientByName,
    addIngredientName,
    addIngredient,
    getIngredientsList,
    modifyIngredient,
    getIngredient,
    remove
}
function getIngredientByName(name){
    return db('ingredients')
    .where("ingredient_name",name).first()
}

function addIngredientName(name){
    return db('ingredients')
    .insert(name)
    .then(() => {
      return db("ingredients").where("ingredient_name", name.ingredient_name).first();
    });
}

async function addIngredient(ingredientobj){
return db('recipe_ingredients')
.insert(ingredientobj)
.then(()=>{
return db("recipe_ingredients").where("ingredient_id", ingredientobj.ingredient_id).first()
})

}

function getIngredientsList(recipe_id) {
    return db("recipe_ingredients as il")
      .leftJoin("ingredients as i", "il.ingredient_id", "i.ingredient_id")
      .select("i.ingredient_name", "il.quantity", "il.quantity_units","il.ingredient_id")
      .where("il.recipe_id", recipe_id);
  }

  function getIngredient(recipe_id,ingredient_id){
      return db("recipe_ingredients")
      .where("ingredient_id", ingredient_id).andWhere("recipe_id",recipe_id).first()
  }

  function modifyIngredient(recipe_id,ingredient_id,payload){
 
    return db("recipe_ingredients")
      .update(payload)
      .where("ingredient_id", ingredient_id).andWhere("recipe_id",recipe_id)
      .then(()=>{
         return payload
      })
      
}
  
function remove(recipe_id, ingredient_id){
    return db("recipe_ingredients").where('ingredient_id',ingredient_id).andWhere("recipe_id",recipe_id).del()
}

