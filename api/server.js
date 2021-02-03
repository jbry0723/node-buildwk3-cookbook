const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const recipesRouter = require("./recipes/recipes-router");
const ingredientsRouter = require("./ingredients/ingredients-router");
const authRouter = require("../api/auth/auth-router");
const instructionsRouter=require('./instructions/instructions-router')

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/recipes", recipesRouter);
server.use("/api/ingredients", ingredientsRouter);
server.use("/api/auth", authRouter);
server.use("/api/instructions", instructionsRouter)

module.exports = server;
