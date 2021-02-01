const express=require('express');
const Recipe=require("./recipes-model")
const router=express.Router();
const {handleErrors}=require("../middleware/router-middleware")

router.get('/', (req,res,next)=>{
    Recipe.getRecipes()
        .then(action=>{
            res.status(200).json(action)
        })
        .catch(next)
})

router.get('/:id/shoppinglist', (req,res,next)=>{
    Recipe.getShoppingList(req.params.id)
    .then(recipeinfo=>{
        res.status(200).json(recipeinfo)
    })
    .catch(next)
})

router.get('/:id/instructions', (req,res,next)=>{
    Recipe.getInstructions(req.params.id)
    .then(instructionslist=>{
        res.status(200).json(instructionslist)
    })
    .catch(next)
})



router.use(handleErrors)

module.exports=router