const express = require("express");
const router = express.Router();
const Recipe = require("../recipes/recipes-model");
const Instructions=require("../instructions/instructions-model")
const { handleErrors } = require('../middleware/router-middleware')
const { restrict } = require("../middleware/auth-middleware");


router.post("/:id", restrict, async (req, res, next) => {
    let instructionsData = req.body;
    let recipe_id=req.params.id
    
  
    try{let recipeExists=await Recipe.getRecipe(recipe_id)
          if(recipeExists){instructionsData.forEach((step)=>{Instructions.add(step);})
        }else{res.status(404).json({ message: `Could not find recipe with id of ${req.params.id}` })}
       let updatedInstructions=Recipe.getInstructions(recipe_id)
       res.status(201).json(updatedInstructions)
    }catch(err){next()}
  });

router.use(handleErrors);

module.exports = router;
