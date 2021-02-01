
exports.seed = function(knex) {
    return knex('users').insert([
            {username: 'testguy', password: 'passwordhash'}, 
            {username: 'secondguy', password: 'passwordhash'}, 
          ]);
        
    };
    