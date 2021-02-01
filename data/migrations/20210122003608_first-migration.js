const { table } = require("../db-config");

exports.up = function (knex) {
  return knex.schema
    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id");
      tbl.string("recipe_name", 128).notNullable();
      tbl
        .integer("source_id")
        .unsigned()
        .references("source_id")
        .inTable("sources")
        .onDelete("CASCADE");
      tbl
        .integer("category_id")
        .unsigned()
        .references("category_id")
        .inTable("categories")
        .onDelete("CASCADE");
      tbl.string("img_url", 240);
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments("ingredient_id");
      tbl.string("ingredient_name", 128).notNullable();
    })
    .createTable("recipe_ingredients", (tbl) => {
      tbl.primary(["recipe_id","ingredient_id"]);
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("CASCADE");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
        .onDelete("CASCADE");
      tbl.float("quantity").unsigned().notNullable();
      tbl.string("quantity_units");
    })
    .createTable("instructions", (tbl) => {
      tbl.increments("instruction_id");
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("CASCADE");
      tbl.string("instruction_text", 600).notNullable();
      tbl.integer("step_number").unsigned().notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("username", 255).notNullable().unique();
      tbl.string("password", 255).notNullable();
    })
    .createTable("sources", (tbl) => {
      tbl.increments("source_id");
      tbl.string("source_name", 255).notNullable().unique();
    })
    .createTable("categories", (tbl) => {
      tbl.increments("category_id");
      tbl.string("category_name", 255).notNullable().unique();
    })
    .createTable("users_recipes", (tbl) => {
      tbl.primary(["user_id", "recipe_id"]);
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("instructions")
    .dropTableIfExists("ingredients_lists")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes")
    .dropTableIfExists("users")
    .dropTableIfExists("sources")
    .dropTableIfExists("categories")
    .dropTableIfExists("users_recipes");
};
