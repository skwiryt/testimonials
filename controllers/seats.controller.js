const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {  
  try {
    res.json(await Seat.find());
  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.getRandom = async (req, res) => {
  try {
    const size = await Seat.countDocuments();
    const random = Math.floor(Math.random() * size);
    const seat = await Seat.findOne().skip(random);
    if (!seat) {
      res.status(404).json({message: 'Not found'});
    } else {
      res.json(seat);
    }    
  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.getOne = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      res.status(404).json({message: 'Not found'});
    } else {
      res.json(seat);
    }
  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.addOne = async (req, res) => {  
  let {day, seat, client, email} = req.body;
  seat = Number(seat);
  day = Number(day);
  try {    
    if (day && seat && client && email) {
      const reservation = await Seat.exists({day: day, seat: seat});
      if (!reservation) {
        let newSeat = new Seat({day, seat, client, email});
        newSeat = await newSeat.save();
        res.json(newSeat);
        res.io.emit('seatBooked', await Seat.find());
      } else {
        res.status(409).json({message: 'The slot is already taken...'});
      }      
    } else {
      res.status(400).json({message: 'ERROR. All fields are required and correct'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.edit = async (req, res) => {
  let {day, seat, client, email} = req.body;
  seat = Number(seat);
  day = Number(day); 
  if (day && seat && client && email) {
    try {
      let seatObject = await Seat.findById(req.params.id);
      if (!seatObject) {
        res.status(404).json({message: 'Not found'});
      } else {
        seatObject.day = day;
        seatObject.seat = seat;
        seatObject.client = client;
        seatObject.email = email;
        seatObject = await seatObject.save();
        res.json(seatObject);
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
    let seat = await Seat.findById(req.params.id);
    if(!seat) {
      res.status(404).json({message: 'Not found'});
    } else {      
      await Seat.deleteOne({_id: req.params.id});
      res.json(seat);
    }    
  } catch(err) {
    res.status(500).json({message: err});
  }    
};
