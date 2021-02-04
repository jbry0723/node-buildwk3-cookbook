const { table } = require("../db-config");

exports.up = function (knex) {
  return knex.schema
    .createTable("categories", (tbl) => {
      tbl.increments("category_id");
      tbl.string("category_name", 255).notNullable().unique();
    })

    .createTable("ingredients", (tbl) => {
      tbl.increments("ingredient_id");
      tbl.string("ingredient_name", 128).notNullable();
    })
   
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("username", 255).notNullable().unique();
      tbl.string("password", 255).notNullable();
    })

    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id");
      tbl.string("recipe_name", 128).notNullable();
      tbl.string("source_name", 255)
      tbl
        .integer("category_id")
        .unsigned()
        .references("category_id")
        .inTable("categories")
        .onDelete("CASCADE");
      tbl.string("img_url", 240);
      tbl
        .integer("creator_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
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
      tbl.unique(['step_number', 'recipe_id'])
    })
    .createTable("recipe_ingredients", (tbl) => {
      tbl.primary(["recipe_id", "ingredient_id"]); 
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
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("recipe_ingredients")
    .dropTableIfExists("instructions")
    .dropTableIfExists("recipes")
    .dropTableIfExists("users")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("categories");
};
