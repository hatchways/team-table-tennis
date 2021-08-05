const expect = require("chai").expect;
const mongoose = require("mongoose");
const Card = require("../models/Card");

describe('Tests for Card Model', () => {

  var db;

  before(() => {
    db = mongoose.connection;
  })

  it('creates, and saves, a card', async () => {
    const card = new Card({ title: 'Card A', description: "A Description"});
    expect(card).to.have.property('title').that.is.equal('Card A');
    expect(card).to.have.property('description').that.is.equal("A Description");
    await card.save();
  })

  it('can be read from db', async () => {
    const card = await Card.findOne({ title: 'Card A'}).exec();
    expect(card).to.be.not.undefined;
    expect(card).to.have.property('title').that.is.equal('Card A');
    expect(card).to.have.property('description').that.is.equal("A Description");
  })

  it('can be updated', async () => {
    const filter = { title : 'Card A' };
    const update = { description : 'Updated Description' };

    await Card.findOneAndUpdate(filter, update);
    const card = await Card.findOne({ title: 'Card A' }).exec();

    expect(card).to.have.property('title').that.is.equal('Card A');
    expect(card).to.have.property('description').that.is.equal("Updated Description");
  })

  it('can be deleted', async () => {
    await Card.deleteOne({ title: 'Card A' })
    const results = await Card.find({ title: 'Card A'})
    expect(results).property('length').to.equal(0);
  })

  after(() => {
    db.dropCollection('cards');
  })
})
