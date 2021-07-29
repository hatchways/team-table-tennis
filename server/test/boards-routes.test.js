const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.js");

chai.should();
chai.use(chaiHttp);

var boardId = "";
var columnId = "";
var cardId = "";

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
          done();
        }
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
          const { board } = res.body;
          board.should.have.property('_id').equal(boardId);
          board.should.have.property('columns').property('length').equal(2);
          done();
        }
      })
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

  it('should create a card', (done) => {
    chai
      .request(app)
      .post('/boards/cards')
      .send({
        title: 'test card',
        description: 'description',
        columnId
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          const cid = res.body.cardId;
          cardId = cid;
          done();
        }
      })
  })

  it('should get a card', (done) => {
    chai
      .request(app)
      .get('/boards/cards')
      .send({
        cardIds: [cardId]
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          const { cards } = res.body;
          const card = cards[0]
          card.should.have.property('title').equal('test card');
          card.should.have.property('description').equal('description');
          done();
        }
      })
  })

  it('should add the column to the board', (done) => {
    chai
      .request(app)
      .get('/boards')
      .send({ boardId })
      .end((err ,res) => {
        if (err) {
          console.error(err);
        } else {
          const { board } = res.body;
          const filtered = board.columns.filter(col => col === columnId);
          filtered.should.have.property('length').should.not.equal(0);
          done();
        }
      })
  })

  it('should update the column', async () => {
    var res = await chai
      .request(app)
      .get('/boards/columns')
      .send({
        columnIds: [columnId]
      })
    var column = res.body.columns[0];
    column.should.not.be.undefined;

    res = await chai
      .request(app)
      .post('/boards/cards')
      .send({
        title: "new card",
        columnId
      })
    const cid = res.body.cardId;

    res = await chai
      .request(app)
      .get('/boards/columns')
      .send({
        columnIds: [columnId]
      })
    var column = res.body.columns[0];
    column.should.have.property('cards').with.lengthOf(2);
    const filtered_cards = column.cards.filter(id => id === cid);
    filtered_cards.should.have.property('length').equal(1);
  })

  it('should move cards', async () => {
    // Set up two columns.
    var res = await chai
    .request(app)
    .post('/boards/columns')
    .send({
      title: 'Col 1',
      boardId,
    })
    var col1 = res.body.column;

    res = await chai
    .request(app)
    .post('/boards/columns')
    .send({
      title: 'Col 1',
      boardId,
    })
    var col2 = res.body.column;

    // Make a card in each column.
    res = await chai
      .request(app)
      .post('/boards/cards')
      .send({
        title: 'card',
        description: '1',
        columnId: col1._id
      })

    var cid1 = res.cardId;

    res = await chai
      .request(app)
      .post('/boards/cards')
      .send({
        title: 'card',
        description: '2',
        columnId: col2._id
      })

    var cid2 = res.cardId;

    // Move card 1 to column 2.
    res = await chai
      .request(app)
      .put('/boards/cards/move')
      .send({
        ogCol: col1._id,
        destColId: col2._id,
        row: 0,
        cardId: cid1,
      })
    res = await chai
      .request(app)
      .post('/boards/cards')
      .send({
        title: 'card',
        description: '1',
        columnId: col1._id
      })
  
    cid1 = res.cardId;
  
    res = await chai
      .request(app)
      .post('/boards/cards')
      .send({
        title: 'card',
        description: '2',
        columnId: col2._id
      })
  
    cid2 = res.cardId;
  })
})