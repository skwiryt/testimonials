const express = require('express');
const socket = require('socket.io');
const path = require('path');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/NewWaveFest/build')));

// odblokowanie wszystkich połączeń
app.use(cors());
/*
odblokowanie niektórych połączeń
app.use(cors({
  "origin": "https://kodilla.com", //origin sets domains that we approve
  "methods": "GET,POST", //we allow only GET and POST methods
}));
*/

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server started on port 8000');
});

const io = socket(server, 
  {
    cors: {
      origin: '*',
    }
  });
io.on('connection', (socket) => {
  console.log('New connection');
});
app.use((req, res, next) => {
  res.io = io;
  next();
})


app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/NewWaveFest/build/index.html'));
});

app.use((req, res) => {
  res.json({message: 'Not found'});
});


// mongoose.connect('mongodb://localhost:27017/newWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://skwiryt:Qwinto123@cluster0.zkoct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

