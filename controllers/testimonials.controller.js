const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.getRandom = async (req, res) => {
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
};

exports.getOne = async (req, res) => {
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
};

exports.addOne = async (req, res) => {
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
};

exports.edit = async (req, res) => {
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
};

exports.delete = async (req, res) => {  
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
};

