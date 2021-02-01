const db = require("../../config/db-config")

async function add(user) {
    const [id] = await db("users").insert(user, "user_id");
    return findById(id);
  }
  
  function findById(user_id) {
    return db("users").where({ user_id }).first();
  }
  
  function findByUsername(username) {
    return db("users").where("username", username).first();
  }

  module.exports = {
    add,
    findById,
    findByUsername,
  };