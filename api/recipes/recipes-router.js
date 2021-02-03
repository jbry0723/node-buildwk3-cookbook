const express = require("express");
const Recipe = require("./recipes-model");
const router = express.Router();
const { handleErrors } = require("../middleware/router-middleware");
const { restrict } = require("../middleware/auth-middleware");

router.get("/", restrict, (req, res, next) => {
  Recipe.getRecipes(req.decodedJwt.subject)
    .then((usersRecipes) => {
      res.status(201).json(usersRecipes);
    })
    .catch(next);
});


router.get("/:id", async (req, res, next) => {
  try {
    let recipe = await Recipe.getRecipe(req.params.id);
    if (!recipe){res.status(404).json({ message: `Could not find recipe with id of ${req.params.id}` })}
    else{
    let instructionsList = await Recipe.getInstructions(req.params.id);
    const ingredientsList = await Recipe.getIngredientsList(req.params.id);
    recipe.instructions = instructionsList;
    recipe.ingredients = ingredientsList;

    res.status(200).json(recipe);}
  } catch (err) {
    next();
  }
});

router.post("/", restrict, (req, res, next) => {
  let recipe = req.body;
  recipe.creator_id = req.decodedJwt.subject;

  Recipe.add(recipe)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch(next);
});

router.put("/:id", restrict, (req, res, next) => {
  let recipe = req.body;
  recipe.recipe_id = req.params.id;
  recipe.creator_id = req.decodedJwt.subject;

  Recipe.getRecipe(req.params.id)
    .then(oldRecipe => {
      if (oldRecipe) {
        return Recipe.update(recipe, recipe.recipe_id);
      } else {
        res
          .status(404)
          .json({ message: `Could not find recipe with id of ${recipe.recipe_id}` });
      }
    })
    .then(updatedRecipe => {
      res.status(201).json(updatedRecipe);
    })
    .catch(next)
});

router.delete("/:id",restrict,(req, res, next) => {

  Recipe.remove(req.params.id)
  .then(deleted=>{
    if (deleted){
      res.json(deleted)
    }else {
      res.status(404).json({message:`Could not find recipe with id of ${req.params.id}`})
    }
  })
  .catch(next)
})

router.use(handleErrors);

module.exports = router;
