const express = require("express");
const recipes = express.Router();
const pool = require("../db");

// import controllers
const {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
} = require("../Controllers/recipes");

recipes.route("/").get(getAllRecipes).post(createRecipe).delete(deleteRecipe);

module.exports = recipes;
