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

app.get('/golfers', (req, res) => {
  if (req.query.name) {
    db.query(`SELECT * FROM golfers WHERE name = ${req.query.name}`,
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
  } else {
    db.query('SELECT * FROM golfers',
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
  }
});

app.post('/golfers', (req, res) => {
  db.query(`INSERT INTO golfers (name) VALUES (${req.query.name})`,
  (error, results, fields) => {
    if (error) {
      res.send(error);
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  })
})

app.get('/bag', (req, res) => {
  db.query(`SELECT d.* FROM discs d,  golfers g,  bags b  WHERE d.id = b.id_disc AND b.id_golfer = g.id AND g.name = '${req.query.golfer}'`,
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

app.post('/bag', (req, res) => {
  db.query(`INSERT INTO bags (id_golfer, id_disc) SELECT g.id, d.id FROM golfers g, discs d WHERE g.name = '${req.query.name}' AND d.model = '${req.query.model}'`,
  (error, results, fields) => {
    if (error) {
      res.send(error);
      res.status(500);
      res.end();
    } else {
      res.status(204);
      res.end();
    }
  });
});

app.put('/bag', (req, res) => {

});


module.exports = app;