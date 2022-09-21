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
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.route("/recipeOverview").get((req, res) => {
  res.status(200).send("Rezeptübersicht");
});

app.route("/aboutUs").get((req, res) => {
  res.status(200).send("Über uns");
});

app.route("/recipe").get((req, res) => {
  res.status(200).send("Rezept");
});
