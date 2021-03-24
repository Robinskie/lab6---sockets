primus = Primus.connect('', {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

const teamInput = document.querySelector('.dashboard-container #teamInput');
const scoreInput = document.querySelector('.dashboard-container #scoreInput');
const updateButton = document.querySelector('.dashboard-container button');
const alertSpan = document.querySelector('.dashboard-container .alert');
let teamData = {};

// Als je teams ontvangt, maak huidige selection menu leeg en vul opnieuw in
primus.on('data', data => {
    teamData = [...data];
    teamInput.innerHTML = '';

    teamData.forEach(team => {
        let optionElement = document.createElement('option');
        teamInput.appendChild(optionElement);
        optionElement.value = team.name;
        optionElement.innerHTML = team.name;
    });

    // Verander scoreveld
    scoreInput.value = teamData[0].score;
});

// Wanneer je een team selecteerd, update de score in de box
teamInput.addEventListener('change', () => {
    // Zoek team met de juiste naam
    const team = teamData.find(team => { return team.name == teamInput.value; });

    // Verander veld
    scoreInput.value = team.score;
});

// Update on click op button !!
updateButton.addEventListener('click', () => {
    // Alert message
    alertSpan.style.display = 'block';
    alertSpan.innerHTML = `${teamInput.value} has been updated!`;

    // Fix if input is 0
    if(scoreInput.value == '' || scoreInput.value < 0)
        scoreInput.value = 0;

    // Sturen naar de server
    primus.write({name: teamInput.value, score: scoreInput.value});
});