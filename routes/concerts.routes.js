const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { v4: uuidv4 } = require('uuid')


router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.concerts.length);
  res.json(db.concerts[randomIndex]);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find(el => el.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const id = uuidv4();
  const {performer, genre, price, day, image} = req.body;
  if (performer && genre && price && day && image) {
    db.concerts.push({ id,  performer, genre, price, day, image})
    res.json({message: 'OK'});
    // res.json(db.concerts);
  } else {
    res.json({message: 'ERROR. All fields are required'});
  }
  

});
router.route('/concerts/:id').put((req, res) => {
  let index = db.concerts.findIndex(el => el.id == req.params.id);
  const {performer, genre, price, day, image} = req.body;
  if (performer && genre && price && day && image) {
    db.concerts[index] = {id: req.params.id, performer, genre, price, day, image};
    res.json({message: 'OK'});
    // res.json(db.concerts);
  } else {
    res.json({message: 'ERROR. All fields are required'});
  }
});
router.route('/concerts/:id').delete((req, res) => {
  let index = db.concerts.findIndex(el => el.id == req.params.id);
  db.concerts.splice(index, 1)
  res.json({message: 'OK'});
  // res.json(db.concerts);
})


module.exports = router;