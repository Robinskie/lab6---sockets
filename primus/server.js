const Primus = require('primus');

const teams = [
  {
    name: 'De Spoider Lonky Legs',
    score: 0,
  }
];

const go = (server) => {
  let primus = new Primus(server, {});

  primus.on('connection', (spark) => {
    console.log("⚡️ we have a spark");

    spark.on("data", (data) => {
      console.log(data);
    });
  });
}

module.exports.go = go;