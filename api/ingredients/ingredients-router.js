const express=require('express');
const Ingredients=require("./ingredients-model")
const router=express.Router();
const {handleErrors}=require("../middleware/router-middleware")

router.get('/:id/recipes', (req,res,next)=>{
    Ingredients.getRecipeByIngredient(req.params.id)
    .then(ingredientsList=>{
        res.status(200).json(ingredientsList)
    })
    .catch(next)
})



router.use(handleErrors)

module.exports=router