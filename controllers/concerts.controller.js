const Concert = require('../models/concert.model');
const Workshop = require('../models/workshop.model');
/*
exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch(err) {
    res.status(500).json({message: err})
  }
};
*/
exports.getAll = async (req, res) => {
  let allConcerts;
  let allWorkshops;
  try {
    allConcerts = await Concert.find().sort('day').lean();
    allWorkshops = await Workshop.find().lean();
  } catch(err) {
    res.status(500).json({message: err})
  }
  const fullConcerts = allConcerts.map(c => ({...c, workshops: allWorkshops.filter(w => w.concertId == c._id)}));
  res.json(fullConcerts);
};

exports.getRandom = async (req, res) => {  
  try {
    const size = await Concert.countDocuments();
    const random = Math.floor(Math.random() * size);
    const concert = await Concert.findOne().skip(random);
    if (!concert) {
      res.status(404).json({message: 'Not found'});
    } else {
      res.json(concert);
    }    
  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.getOne = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) {
      res.status(404).json({message: 'Not found'});
    } else {
      res.json(concert);
    }
  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.addOne = async (req, res) => {  
  let {performer, genre, price, day, image} = req.body;
  price = Number(price);
  day = Number(day);
  if (performer && genre && price && day && image) {
    try {
      let newConcert = new Concert({performer, genre, price, day, image});
      newConcert = await newConcert.save();
      res.json(newConcert);
    } catch(err) {
      res.status(500).json({message: err});
    }
  } else {
    res.status(400).json({message: 'ERROR. All fields are required and correct'});
  } 
};

exports.edit = async (req, res) => {  
  let {performer, genre, price, day, image} = req.body;
  price = Number(price);
  day = Number(day);
  if (performer && genre && price && day && image) {
    try {
      let concert = await Concert.findById(req.params.id);
      if(!concert) {
        res.status(404).json({message: 'Not found'});
      } else {        
        // concert = {...concert, ...{performer, genre, price, day, image}};
        concert.performer = performer;
        concert.genre = genre;
        concert.price = price;
        concert.day = day;
        concert.image = image;
        concert = await concert.save();        
        res.json(concert);
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
    let concert = await Concert.findById(req.params.id);
    if(!concert) {
      res.status(404).json({message: 'Not found'});
    } else {      
      await Concert.deleteOne({_id: req.params.id});
      res.json(concert);
    }    
  } catch(err) {
    res.status(500).json({message: err});
  }    
};
