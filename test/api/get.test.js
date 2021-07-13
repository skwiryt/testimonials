const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert= require('../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

let server;
describe('GET', () => {
  before(() => {
    server = require('../../server.js');
  });
  after(() => {
    server.close();
  })
  describe('/api/concerts', () => {   
    
    it('/ should return all concerts with workshops array', async () => {
      const res = await request(server).get('/api/concerts');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(3);
      expect(res.body[0].workshops.length).to.be.equal(2);
    });
  });
});
