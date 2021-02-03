exports.seed = function (knex) {
  return knex("ingredients").insert([
    { ingredient_name: "milk" }, //21
    { ingredient_name: "flour" }, //22
    { ingredient_name: "sugar" }, //23
    { ingredient_name: "butter" }, //24
    { ingredient_name: "salt" }, //5
  ]);
};
