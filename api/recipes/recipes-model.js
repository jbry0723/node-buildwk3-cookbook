const { select } = require("../../data/db-config");
const db = require("../../data/db-config");

module.exports = {
  getRecipe,
  getRecipes,
  getIngredientsList,
  getInstructions,
  findByCategory,
  add,
  update,
  remove
};

function getRecipe(recipe_id) {
  return db("recipes as r")
    .leftJoin("categories as c", "r.category_id", "c.category_id")
    .select(
      "r.recipe_name",
      "r.source_name",
      "img_url",
      "c.category_id",
      "r.recipe_id"
    )
    .where("r.recipe_id", recipe_id)
    .first();
}

function getRecipes(user_id) {
  return db("recipes as r")
    .leftJoin("categories as c", "r.category_id", "c.category_id")
    .select(
      "r.recipe_name as recipe",
      "c.category_name as category",
      "r.recipe_id as id"
    )
    .where("r.creator_id", user_id);
}

function getIngredientsList(recipe_id) {
  return db("recipe_ingredients as il")
    .leftJoin("ingredients as i", "il.ingredient_id", "i.ingredient_id")
    .select("i.ingredient_name", "il.quantity", "il.quantity_units")
    .where("il.recipe_id", recipe_id);
}

function getInstructions(recipe_id) {
  return db("instructions as i")
    .select("i.instruction_text", "i.step_number")
    .orderBy("i.step_number", "asc")
    .where("i.recipe_id", recipe_id);
}

// select r.recipe_name from ingredients_lists il
// left join recipes r
// on  il.recipe_id=r.recipe_id
// where ingredient_id=4

// select r.recipe_name as recipe, r.source_name as source, c.category_name, img_url  from recipes r
// left join categories c on c.category_id=r.category_id
// where c.category_name="Breakfast"

function findByCategory(categoryId) {
  return db("recipes as r")
    .leftJoin("categories as c", "c.category_id", "r.category_id")
    .where("c.category_id", categoryId);
}

function add(recipe) {
  return db("recipes")
    .insert(recipe)
    .then(([id]) => {
      return db("recipes").where("recipe_id", id).first();
    });
}

function update(changes, recipe_id) {
  return db("recipes")
    .update(changes)
    .where("recipe_id", recipe_id)
    .then(() => {
      return getRecipe(recipe_id);
    });
}

async function remove(recipe_id){
    const recipeToDelete=await getRecipe(recipe_id)
    if(!recipeToDelete){return null}
    else{
    await db('recipes').where('recipe_id',recipe_id).del()
    return Promise.resolve(recipeToDelete)
    }
}