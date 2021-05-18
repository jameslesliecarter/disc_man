const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/models', (req, res) => {
  db.query(`SELECT * FROM discs WHERE brand = '${req.query.brand}'`,
  (error, results, fields) => {
    if (error) {
      res.send(error);
      res.status(500);
      res.end();
    } else {
      res.json(results);
      res.status(200);
      res.end();
    }
  });
});

app.get('/disc', (req, res) => {
  db.query(`SELECT * FROM discs WHERE model = '${req.query.model}'`,
  (error, results, fields) => {
    if (error) {
      res.send(error);
      res.status(500);
      res.end();
    } else {
      res.json(results);
      res.status(200);
      res.end();
    }
  });
});

app.post('/similar', (req, res) => {
  const {SPEED, GLIDE, TURN, FADE} = req.body;
  db.query(`SELECT * FROM discs WHERE SPEED = ${SPEED} AND GLIDE = ${GLIDE} AND TURN = ${TURN} AND FADE = ${FADE}`,
  (error, results, fields) => {
    if (error) {
      res.send(error);
      res.status(500);
      res.end();
    } else {
      res.json(results);
      res.status(200);
      res.end();
    }
  });
});

app.get('/test', (req, res) => {
  res.send(req.body);
  res.status(200);
  res.end();
});

module.exports = app;