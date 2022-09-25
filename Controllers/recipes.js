const pool = require("../db");
const { body, validationResult } = require("express-validator");

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const { rows: allRecipes, rowCount } = await pool.query(
      'SELECT * FROM recipes ORDER by "Recipe_id";'
    );
    console.log("all recipes", allRecipes);
    if (!rowCount) return res.status(404).send("No recipes found");
    return res.status(200).json(allRecipes);
  } catch (err) {
    console.log(err);
    return res.Status(500).send("Something went wrong");
  }
};

// Create recipe
const createRecipe = async (req, res) => {
  const {
    image,
    title,
    requiredTime,
    difficulty,
    author,
    date,
    description,
    ingredients,
  } = req.body;

  if (
    !image ||
    !title ||
    !requiredTime ||
    !difficulty ||
    !author ||
    !date ||
    !description ||
    !ingredients
  ) {
    return res.status(400).send("Please fill in all fields.");
  }
  try {
    const {
      rows: [createdRecipe],
    } = await pool.query(
      `INSERT INTO recipes (image, title, required_time, difficulty, author, date, description, ingredients) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      [
        image,
        title,
        requiredTime,
        difficulty,
        author,
        date,
        description,
        ingredients,
      ]
    );
    return res.status(201).send(createdRecipe);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  const { Recipe_id } = req.body;
  if (!Recipe_id) {
    return res.status(400).send("Bitte Rezept ID angeben.");
  }
  try {
    const {
      rows: [deletedRecipe],
      rowCount,
    } = await pool.query(
      'DELETE FROM recipes WHERE "Recipe_id" = $1 RETURNING *;',
      [Recipe_id]
    );
    console.log("Rezept gelöscht", deletedRecipe);
    if (!rowCount)
      return res
        .status(400)
        .send(`Kein Rezept mit der ID ${Recipe_id} gefunden.`);
    res
      .status(200)
      .send(`Das Rezept mit der ID ${deletedRecipe.Recipe_id} wurde gelöscht.`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Etwas ist schiefgelaufen.");
  }
};

module.exports = {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
};
