const express=require('express');
const Ingredients=require("./ingredients-model")
const router=express.Router();
const {handleErrors}=require("../middleware/router-middleware")




router.use(handleErrors)

module.exports=router