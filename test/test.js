const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.

const server = supertest.agent("http://localhost:8000");
let id = null;
const note = { href: 'testhref', name: 'testname' }; 
// UNIT test begin

describe("SAMPLE unit test",() => {


  it("testing adding a link", (done) => {
    server
    .post("/links")
    .send(note)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end((err, res) => {
      id = res.body._id;
      done();
    });
  });

  it("Test getting all links", (done) => {
    server
    .get("/links")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end((err,res) => {
      done();
    });
  });

  it("Test getting single link", (done) => {
    server
    .get("/links/" + id)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end((err,res) => {
      done();
    });
  });

  it("Test update a link", (done) => {
    server
    .put("/links/" + id)
    .send({ href: 'testhref2', name: 'testname2' })
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end((err,res) => {
      done();
    });
  });

  it("Test deleting a link", (done) => {
    server
    .del("/links/" + id)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end((err,res) => {
      done();
    });
  });

});