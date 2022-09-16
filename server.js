require('dotenv').config();

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app
.route('/')
.get((req, res) => {res.status(200).send('Home')})


app
.route('/recipeOverview')
.get((req, res) => {res.status(200).send('Rezeptübersicht')})

app
.route('/aboutUs')
.get((req, res) => {res.status(200).send('Über uns')})

app
.route('/recipe')
.get((req, res) => {res.status(200).send('Rezept')})



