const express = require('express');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
/*
odblokowanie wszystkich połączeń
app.use(cors());
odblokowanie niektórych połączeń
app.use(cors({
  "origin": "https://kodilla.com", //origin sets domains that we approve
  "methods": "GET,POST", //we allow only GET and POST methods
}));
*/

app.use((req, res) => {
  res.json({message: 'Not found'});
})
app.listen(8000);