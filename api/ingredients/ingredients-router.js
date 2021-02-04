const express = require("express");
const Ingredients = require("./ingredients-model");
const router = express.Router();
const { handleErrors } = require("../middleware/router-middleware");
const { restrict } = require("../middleware/auth-middleware");

router.post("/:id", restrict, async (req, res, next) => {
  try {
    let ingredientData = req.body;
    let recipe_id = req.params.id;
    ingredientData.recipe_id = recipe_id;
    let iName = ingredientData.ingredient_name;

    let ingredientNameExists = await Ingredients.getIngredientByName(
      ingredientData.ingredient_name
    );
    if (ingredientNameExists) {
      ingredientData.ingredient_id = ingredientNameExists.ingredient_id;
    } else {
      let nameObj = { ingredient_name: iName };
      let ingredient_item = await Ingredients.addIngredientName(nameObj);
      ingredientData.ingredient_id = ingredient_item.ingredient_id;
    }
    delete ingredientData["ingredient_name"];
    let rIngredientData = await Ingredients.addIngredient(ingredientData);
    rIngredientData.ingredient_name = iName;
    res.status(200).json(rIngredientData);
  } catch (error) {
    console.log(error),
      res.status(404).json({
        message:
          "Ingredient already exists for recipe, or recipe does not exist",
      });
  }
});

router.put("/:id/:ingredient_id", restrict, async (req, res, next) => {
  let ingredientData = req.body;
  ingredientData.ingredient_id = req.params.ingredient_id;
  ingredientData.recipe_id = req.params.id;

  try {
    if (ingredientData.ingredient_name) {
      let ingredientNameExists = await Ingredients.getIngredientByName(
        ingredientData.ingredient_name
      );
      if (ingredientNameExists) {
        ingredientData.ingredient_id = ingredientNameExists.ingredient_id;
      } else {
        let nameObj = { ingredient_name: iName };
        let ingredient_item = await Ingredients.addIngredientName(nameObj);
        ingredientData.ingredient_id = ingredient_item.ingredient_id;
      }
    }
    delete ingredientData["ingredient_name"];
    let rIngredientData = await Ingredients.modifyIngredient(
      ingredientData.recipe_id,
      req.params.ingredient_id,
      ingredientData
    );
    
      res.status(200).json(rIngredientData);
    
  } catch (error) {
    console.log(error), res.status(404).json({ message: "No entry found." });
  }
});

router.delete("/:id/:ingredient_id", restrict, async (req, res, next) => {
    try{let ingredientEntry=await Ingredients.getIngredient(req.params.id,req.params.ingredient_id)
    if (!ingredientEntry){ res
        .status(404)
        .json({ message: "No entry found" })
    }
    else{deleted= await Ingredients.remove(req.params.id, req.params.ingredient_id)
    res.status(201).json(ingredientEntry)
    }
    }
    catch(error){res
        .status(404)
        .json({ message: "No entry found" })}
})

router.use(handleErrors);

module.exports = router;
