const Primus = require('primus');

const teams = [
  {
    name: '🌹 Boston Flowers',
    score: 8,
  },
  {
    name: '🌞 Hellmouth Sunbeams',
    score: 5,
  },
  {
    name: '👟 Charleston Shoe Thieves',
    score: 4,
  },
  {
    name: '🍬 Kansas City Breath Mints',
    score: 3,
  },
  {
    name: '🌮 LA Unlimited Tacos',
    score: 10,
  },
];

const go = (server) => {
  let primus = new Primus(server, {});

  primus.on('connection', (spark) => {
    console.log("⚡️ we have a spark");

    spark.write(teams);

    // Team update gestuurd !!
    spark.on("data", (data) => {
      // Verander team met deze naam
      // Zoek team met de juiste naam
      const team = teams.find(team => { return team.name == data.name; });
      team.score = parseInt(data.score);

      // Terug sturen naar alle leaderboards
      primus.write(teams);
    });
  });
}

module.exports.go = go;