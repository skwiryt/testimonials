const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { v4: uuidv4 } = require('uuid')


router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.seats.length);
  res.json(db.seats[randomIndex]);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find(el => el.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const id = uuidv4();
  const {day, seat, client, email} = req.body;
  const reservation = db.seats.some(r => r.day == day && r.seat == seat);
  if (day && seat && client && email && !reservation) {
    db.seats.push({ id, day, seat, client, email })
    res.json({message: 'OK'});
    // res.json(db.seats);
  } else if (reservation) {
    res.status(409).json({message: 'The slot is already taken...'});
  } else {
    res.status(400).json({message: 'ERROR. All fields are required'});
  }
  

});
router.route('/seats/:id').put((req, res) => {
  let index = db.seats.findIndex(el => el.id == req.params.id);
  const {day, seat, client, email} = req.body;
  if (day && seat && client && email) {
    db.seats[index] = {id: req.params.id, day, seat, client, email};
    res.json({message: 'OK'});
    // res.json(db.seats);
  } else {
    res.status(400).json({message: 'ERROR. All fields are required'});
  }
});
router.route('/seats/:id').delete((req, res) => {
  let index = db.seats.findIndex(el => el.id == req.params.id);
  db.seats.splice(index, 1)
  res.json({message: 'OK'});
  // res.json(db.seats);
})


module.exports = router;