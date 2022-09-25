require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const pg = require("pg");
const PORT = process.env.PORT || 8080;

// routes import
const recipesRouter = require("./Routes/recipes");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//parse the body of any request coming from html forms
app.use(express.urlencoded({ extended: true }));

//parse the body of any request not coming through an html form
app.use(express.json());

//allow CORS from any origin
app.use(cors());

// Routes
app.use("/", recipesRouter);
