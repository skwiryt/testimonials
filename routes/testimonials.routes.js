const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonial.model');

router.route('/testimonials').get(async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch(err) {
    res.status(500).json({message: err})
  }
});

router.route('/testimonials/random').get(async (req, res) => {
  try {
    const size = await Testimonial.countDocuments();
    const random = Math.floor(Math.random() * size);
    const testimonial = await Testimonial.findOne().skip(random);
    if (!testimonial) {
      res.status(404).json({message: 'Not found'});
    } else {
      res.json(testimonial);
    }    
  } catch(err) {
    res.status(500).json({message: err})
  }
});

router.route('/testimonials/:id').get(async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      res.status(404).json({message: 'Not found'});
    } else {
      res.json(testimonial);
    }
  } catch(err) {
    res.status(500).json({message: err})
  }
});

router.route('/testimonials').post(async (req, res) => {
  let {author, text} = req.body;  
  if (author && text) {
    try {
      let newTestimonial = new Testimonial({author, text});
      newTestimonial = await newTestimonial.save();
      res.json(newTestimonial);
    } catch(err) {
      res.status(500).json({message: err});
    }
  } else {
    res.status(400).json({message: 'ERROR. All fields are required and correct'});
  }
});
router.route('/testimonials/:id').put(async (req, res) => {
  let {author, text} = req.body; 
  if (author && text) {
    try {
      let testimonial = await Testimonial.findById(req.params.id);
      if(!testimonial) {
        res.status(404).json({message: 'Not found'});
      } else {
        testimonial.author = author;
        testimonial.text = text;
        
        testimonial = await testimonial.save();        
        res.json(testimonial);
      }    
    } catch(err) {
      res.status(500).json({message: err});
    }    
  } else {
    res.status(400).json({message: 'ERROR. All fields are required and correct'});
  }
});
router.route('/testimonials/:id').delete(async (req, res) => {  
  try {
    let testimonial = await Testimonial.findById(req.params.id);
    if(!testimonial) {
      res.status(404).json({message: 'Not found'});
    } else {      
      await Testimonial.deleteOne({_id: req.params.id});
      res.json(testimonial);
    }    
  } catch(err) {
    res.status(500).json({message: err});
  }    
})


module.exports = router;