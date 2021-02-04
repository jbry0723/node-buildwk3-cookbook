const { select, orWhereNotExists } = require("../../data/db-config");
const db = require("../../data/db-config");
const { getRecipe } = require("../recipes/recipes-model");

module.exports = {
  add,
  remove,
  update,
  getInstructions,
  getInstruction,
  getInstructionByStepNumber

};

async function add(step) {
    let added = await db("instructions").insert(step)
    return added
}

async function remove(instruction_id){
  return db("instructions").where('instruction_id',instruction_id).del()

}

function getInstructions(recipe_id) {
  return db("instructions as i")
    .select("i.instruction_text", "i.step_number", "i.instruction_id")
    .orderBy("i.step_number", "asc")
    .where("i.recipe_id", recipe_id);
}

function getInstruction(instruction_id){
  return db("instructions as i")
  .select("i.instruction_id", "i.instruction_text", "i.step_number")
  .where("i.instruction_id",instruction_id).first()
}

function update(changes,instruction_id){
 
    return db("instructions")
      .update(changes)
      .where("instruction_id", instruction_id)     
}

function getInstructionByStepNumber(recipe_id,step_number){
  return db("instructions as i")
  .select("i.instruction_id", "i.step_number","i.recipe_id")
  .where("i.recipe_id",recipe_id).andWhere("i.step_number",step_number).first()
}

