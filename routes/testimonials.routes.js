const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { v4: uuidv4 } = require('uuid')


router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find(el => el.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const id = uuidv4();
  const {author, text} = req.body;
  if (author && text) {
    db.testimonials.push({ id, author, text })
    res.json({message: 'OK'});
    // res.json(db.testimonials);
  } else {
    res.status(400).json({message: 'ERROR. All fields are required'});
  }
});
router.route('/testimonials/:id').put((req, res) => {
  let index = db.testimonials.findIndex(el => el.id == req.params.id);
  const {author, text} = req.body;
  if (author && text) {
    db.testimonials[index] = {id: req.params.id, author, text};
    res.json({message: 'OK'});
    // res.json(db.testimonials);
  } else {
    res.status(400).json({message: 'ERROR. All fields are required'});
  }
});
router.route('/testimonials/:id').delete((req, res) => {
  let index = db.testimonials.findIndex(el => el.id == req.params.id);
  db.testimonials.splice(index, 1)
  res.json({message: 'OK'});
  // res.json(db.testimonials);
})


module.exports = router;