let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('get all notes: ',()=>{
  it('should get all notes', (done) => {
    chai.request(url)
      .get('/')
      .end( function(err,res){
        //console.log(res.body)
        expect(res).to.have.status(200);
        expect(res).to.be.an('object')
        expect({message: "Get list notes"})
        done();
      });
  });
});

describe('get one note: ',()=>{
  it('should get property id', (done) => {
    chai.request(url)
      .get('/5b29663d9c19fb13a762a09b')
      .end( function(err,res){
        //console.log(res.body.oneNote)
        expect(res).to.have.status(200);
        expect(res.body.oneNote).to.have.property('_id').to.be.equal('5b29663d9c19fb13a762a09b');
        done();
      });
  });
  it('should get string title', (done) => {
    chai.request(url)
      .get('/5b29663d9c19fb13a762a09b')
      .end( function(err,res){
        //console.log(res.body.oneNote)
        expect(res).to.have.status(200);
        expect(res.body.oneNote).to.have.property('title').to.be.an('string')
        done();
      });
  });
    it('should get string note', (done) => {
      chai.request(url)
        .get('/5b29663d9c19fb13a762a09b')
        .end( function(err,res){
          //console.log(res.body.oneNote)
          expect(res).to.have.status(200);
          expect(res.body.oneNote).to.have.property('note').to.be.an('string')
          done();
        });
    });
    it('should get Boolean like', (done) => {
      chai.request(url)
        .get('/5b29663d9c19fb13a762a09b')
        .end( function(err,res){
          //console.log(res.body.oneNote)
          expect(res).to.have.status(200);
          expect(res.body.oneNote).to.have.property('like').to.be.an('boolean')
          done();
        });
    });
  });

  describe('get list notes likes:',()=>{
    it('should get all notes likes', (done) => {
      chai.request(url)
        .get('/like')
        .end( function(err,res){
          //console.log(res.body.listNote)
          expect(res).to.have.status(200);
          expect(res.body.listNote[0]).to.deep.include({like:true});
          expect({message: "Get list notes likes"})
          done();
        });
    });
  });

  describe('create a note:',()=>{
    it('should insert a note, message: New note created¡', (done) => {
      chai.request(url)
        .post('/new')
        .send({title: 'Hola test', note: 'esto es una nota prueba de test', like: true})
        .end( function(err,res){
          //console.log(res.body)
          expect(res).to.have.status(201);
          expect({message: "New note created¡"})
          done();
        });
    });
  });
  