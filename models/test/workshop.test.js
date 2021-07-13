const Workshop = require('../workshop.model');
const Concert = require('../concert.model');
const { expect } = require('chai');

describe('Workshop', () => {
  it('should validate when called with proper arguments', () => {
    const newWorkshop = new Workshop({name: 'someName', concertId: '123e45t6y7u890654'});
    newWorkshop.validate((err) => {
      expect(err).to.be.null;
    });   
  });

  it('should not validate when called without "name" argument', () => {
    const newWorkshop = new Workshop({concertId: '123e45t6y7u890654'});
    newWorkshop.validate((err) => {
      expect(err.errors.name).to.exist;
    });   
  });
  
  it('should not validate when called with improper "name" argument', () => {
    const cases = [{}, [], undefined, null];
    cases.forEach((c) => {
      const newWorkshop = new Workshop({name: c, concertId: '123e45t6y7u890654'});
      newWorkshop.validate((err) => {
        expect(err.errors.name).to.exist;
      })
    });   
  });

  
  it('should not validate when called without "concertId" argument', () => {
    const newWorkshop = new Workshop({name: 'someName'});
    newWorkshop.validate((err) => {
      expect(err.errors.concertId).to.exist;
    });   
  });

  it('should not validate when called with improper "concertId" argument', () => {
    const cases = [{}, [], undefined, null];
    cases.forEach((c) => {
      const newWorkshop = new Workshop({name: 'someName', concertId: c});
      newWorkshop.validate((err) => {
        expect(err.errors.concertId).to.exist;
      })
    });   
  });

  it('should be able to populate concert object', () => {
    const newWorkshop = new Workshop({name: 'someName', concertId: '123e45t6y7u890654'}).populate('Concert');
    newWorkshop.validate((err) => {
      expect(err).to.be.null;
    });   
  })

})