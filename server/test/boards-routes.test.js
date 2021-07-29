const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.js");

chai.should();
chai.use(chaiHttp);

var boardId = "";
var columnId;

describe('Board routes', () => {

  it('should create a board', (done) => {
    chai
      .request(app)
      .post('/boards')
      .send({ title: 'Test Board' })
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          res.body.success.should.have
            .property('boardId')
            .not.eql(undefined)
          boardId = res.body.success.boardId;
        }
        done();
      })
  })

  it('should get a board', (done) => {
    chai
      .request(app)
      .get('/boards')
      .send({ boardId })
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          const board = res.body.board;
          board.should.have.property('id').equal(boardId);
          board.should.have.property('columns').property('length').equal(2);
        }
      })
    done();
  })

  it('should create a column', (done) => {
    chai
      .request(app)
      .post('/boards/columns')
      .send({
        title: 'Test',
        boardId,
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          const { column } = res.body;
          column.should.not.equal(undefined);
          column.title.should.equal('Test');
          column.cards.length.should.equal(0);
          columnId = column._id;
          done();
        }
      })
  })

  it('should let you get columns', (done) => {
    chai
      .request(app)
      .get('/boards/columns')
      .send({
        columnIds: [columnId]
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          const { columns } = res.body;
          columns.should.have.property('length').equal(1);
          const column = columns[0];
          column.title.should.equal('Test');
          column.cards.length.should.equal(0);
          column._id.should.equal(columnId);
          done();
        }
      })
  })
})