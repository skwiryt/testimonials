const {MongoMemoryServer} = require('mongodb-memory-server');
const Workshop = require('../workshop.model');
const Concert = require('../concert.model');
const mongoose = require('mongoose');
const {expect} = require('chai');

describe('Workshop', () => {
  before(async () => {
    try {
      const fakeDB = await MongoMemoryServer.create();
      const uri = await fakeDB.getUri();
  
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    } catch(err) {
      console.log(err);
    }
  });
  after(async () => {
    mongoose.connection.close();
  });

  describe('Reading data', () => {
    
    before(async () => {
      
      const mockWorkshopData = [
        {
          name: "Rock Music Style",
          concertId: "60e3468403790bbe2dda4470"
        },
        {
          name: "How to make you voice grooowl",
          concertId: "60e3468403790bbe2dda4470"
        },        
        {
          name: "Find your real tune",
          concertId: "60e3468403790bbe2dda446f"
        },
        {
          name: "Find your real YOU",
          concertId: "60e3468403790bbe2dda446f"
        }       
      ];
      const mockConcertData = [
        {
          _id:"60e3468403790bbe2dda4470",
          performer:"John Doe",
          genre:"Rock",
          price:25,
          day:1,
          image:"/img/uploads/1fsd324fsdg.jpg"
        },
        {
          _id:"60e3468403790bbe2dda446f",
          performer:"Rebekah Parker",
          genre:"R&B",
          price:25,
          day:1,
          image:"/img/uploads/2f342s4fsdg.jpg"
        }        
      ];
      
      try {
        await Promise.all(mockWorkshopData.map(async (d) => {
          const newWorkshop = new Workshop(d);
          await newWorkshop.save();
        }));
        await Promise.all(mockConcertData.map(async (d) => {
          const newConcert = new Concert(d);
          await newConcert.save();
        }));
      } catch(err) {
        console.log('Error in seeding mock db:', err);
      }
    });

    it('should return all data with find function', async () => {
      const data = await Workshop.find();
      expect(data.length).to.be.equal(4);
    });
    it('should return right data with findOne function', async () => {
      const data = await Workshop.findOne({name: "Find your real YOU"});
      expect(data).to.be.an('object');
    });
    it('should be able to populate with findOne function', async () => {
      const data = await Workshop.findOne({name: "Find your real YOU"}).populate('concertId');
      expect(data.concertId).to.be.an('object');
    })

  })
})