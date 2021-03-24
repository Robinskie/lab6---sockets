const Primus = require('primus');

const teams = [
  {
    name: '🌹 Boston Flowers',
    score: 0,
  },
  {
    name: '🌞 Hellmouth Sunbeams',
    score: 0,
  },
  {
    name: '👟 Charleston Shoe Thieves',
    score: 0,
  },
  {
    name: '🍬 Kansas City Breath Mints',
    score: 0,
  },
  {
    name: '🌮 LA Unlimited Tacos',
    score: 0,
  },
];

const go = (server) => {
  let primus = new Primus(server, {});

  primus.on('connection', (spark) => {
    console.log("⚡️ we have a spark");

    spark.write(teams);

    spark.on("data", (data) => {
      console.log(data);
    });
  });
}

module.exports.go = go;