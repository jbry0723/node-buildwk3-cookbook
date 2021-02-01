const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const recipesRouter = require("./recipes/recipes-router");
const ingredientsRouter = require("./ingredients/ingredients-router");
const authRouter = require("../api/auth/auth-router");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/recipes", recipesRouter);
server.use("/api/ingredients", ingredientsRouter);
server.use("/api/auth", authRouter);

module.exports = server;
