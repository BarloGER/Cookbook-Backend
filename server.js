require('dotenv').config();

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;
const pg = require('pg');

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



//or native libpq bindings
//var pg = require('pg').native

const conString = "postgres://ukkbuzuk:j96lW0UwEMWJzgWvKPBOq_bM_lYz9656@tyke.db.elephantsql.com/ukkbuzuk" //Can be found in the Details page
const client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});
