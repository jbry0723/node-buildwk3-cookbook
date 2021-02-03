exports.seed = function(knex) {

    return knex('categories').insert([
        {category_name:"Breakfast"},
        {category_name:"Dessert"}
        ]);
    
}