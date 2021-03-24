primus = Primus.connect('', {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

const teamList = document.querySelector('.leaderboard-container ul');

// Als je teams ontvangt, maak huidige tabel leeg en vul opnieuw in
primus.on('data', data => {
    // Sorteren op score
    data.sort((team1, team2) => {return team2.score - team1.score});

    teamList.innerHTML = '';
    data.forEach(team => {
        teamList.innerHTML += `<li><span class='team-name'>${team.name}</span><span class='team-score'>${team.score}</span>`;
    })
});