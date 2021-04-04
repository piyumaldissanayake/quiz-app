const username = document.getElementById('username');
const saveScoreButton = document.getElementById('save-score-button');
const finalScore = document.getElementById('final-score');


const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// ONLY 5 HIGH SCORES ARE KEPT
const MAX_HIGH_SCORES = 5;

const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerHTML = mostRecentScore;



username.addEventListener('keyup', ()=> {
    saveScoreButton.disabled = !username.value;
})

// only saving top 5 scores
saveHighScore = (event) => {
    event.preventDefault();
    
    const score = {
        name: username.value,
        score: mostRecentScore
    }

    highScores.push(score);

    // sorting array to be in a decending order by scores
    highScores.sort((a, b) => b.score - a.score);

    // keeping the high scores list to a maximum of 5 scores
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    return window.location.assign('/');

    
    
}