require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const pg = require("pg");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM recipes");
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.post("/", async (req, res) => {
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
  console.log(req.body);

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
});

app.delete("/", async (req, res) => {
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
});
