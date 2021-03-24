const Primus = require('primus');

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