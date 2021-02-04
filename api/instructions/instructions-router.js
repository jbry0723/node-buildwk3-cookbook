const express = require("express");
const router = express.Router();
const Recipe = require("../recipes/recipes-model");
const Instructions = require("../instructions/instructions-model");
const { handleErrors } = require("../middleware/router-middleware");
const { restrict } = require("../middleware/auth-middleware");

router.post("/:id", restrict, (req, res, next) => {
  let instructionsData = req.body;
  let recipe_id = req.params.id;
  instructionsData.recipe_id = recipe_id;

  Instructions.getInstructionByStepNumber(
    recipe_id,
    instructionsData.step_number
  )
    .then((instructions) => {
      if (instructions) {
        res.status(404).json({
          message: `Step number already exists`,
        });
      } else {
        Instructions.add(instructionsData)
          .then(() => {
            res.status(201).json(instructionsData);
          })
          .catch(next);
      }
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
});

router.delete("/:id/:instruction_id", restrict, (req, res, next) => {
  Instructions.getInstruction(req.params.instruction_id)
    .then((instruction) => {
      if (!instruction) {
        res.status(404).json({
          message: `Step does not exist`,
        });
      } else {
        Instructions.remove(req.params.instruction_id)
          .then(() => {
            res.status(201).json({
              message: `Instruction with id of ${req.params.instruction_id} deleted`,
            });
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.put("/:id/:instruction_id", restrict, (req, res, next) => {
  let instruction = req.body;
  instruction.instruction_id = req.params.instruction_id;
  instruction.recipe_id = req.params.id;
  Instructions.getInstruction(req.params.instruction_id)
    .then((instructionExists) => {
      if (!instructionExists) {
        res.status(404).json({
          message: `Step does not exist`,
        });
      } else {
        Instructions.update(instruction, req.params.instruction_id)
          .then(() => {
            res.status(201).json(instruction);
          })
          .catch((err) => {
            res.status(404).json({ message: `Step number already taken` });
          });
      }
    })
    .catch(next);
});

router.use(handleErrors);

module.exports = router;
