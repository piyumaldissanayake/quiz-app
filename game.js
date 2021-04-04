console.log("Hello world from game");

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progress-text");
const progressBarFull = document.getElementById("progress-bar-full");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;

startGame = () =>{
    questionsCounter = 0;
    score = 0;
    // we use the spread operator to get the available questions
    // simply because if not both of them is going to point to the same thing.
    availableQuestions = [...questions];
    getNewQuestion();

}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        // GO TO THE END PAGE
        return window.location.assign('/end.html');
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // seeting questioncounter for HUD
    progressText.innerHTML = `Question: ${questionCounter}/${questions.length}`

    // filling up the progress bar the questionar progreeses
    progressBarFull.style.width = Math.floor((questionCounter/questions.length)*100)+'%';
    
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // usage of turnary operator
        const classToApply  = selectedAnswer == currentQuestion.answer? 'correct':'incorrect';

        selectedChoice.parentElement.classList.add(classToApply);
        
        scoreText.innerHTML = (classToApply == 'correct')? (score=score+CORRECT_BONUS) : score;
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 2000);

        
    })
});

startGame();