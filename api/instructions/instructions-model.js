const { select } = require("../../data/db-config");
const db = require("../../data/db-config");
const { getRecipe,getInstructions } = require("../recipes/recipes-model");

module.exports = {
add
  };

  function add(step, id){
  
   return db('instructions').insert(step)
  
  }
