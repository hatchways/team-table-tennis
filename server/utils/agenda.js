const Agenda = require("agenda");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const sendMail = require("./SIB");

dbName = "kanban_logs";
let db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);

  // Storing a reference to the database so you can use it later
  db = client.db(dbName);
  console.log(`Connected MongoDB: ${url}`);
  console.log(`Database: ${dbName}`);
});

const connectionOpts = {
  db: {
    address: "mongodb://localhost:27017/agenda-test",
    collection: "agendaJobs",
  },
};

const agenda = new Agenda(connectionOpts);



agenda.define("send email", async function (job, done) {
  console.log(job.attrs.data)
  console.log("sending email");
  await sendMail();
  done();
});

const agendaStart = async() => {
  // '1 2 * * 1-5'
  // At 12:00 on every day-of-week from Monday through Sunday

  await agenda.on("ready", function () {
    console.log("agenda started");

    agenda.every("1 2 * * 1-7", "send email");
    agenda.start();
  });
};

module.exports = agendaStart;
