var currentQuestion = "";
var questionArray = "";
const quizData = '{"response_code":0,"results":[{"category":"Sports","type":"multiple","difficulty":"easy","question":"How many soccer players should be on the field at the same time?","correct_answer":"22","incorrect_answers":["20","24","26"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"Who is often called &quot;the Maestro&quot; in the men&#039;s tennis circuit?","correct_answer":"Roger Federer","incorrect_answers":["Bill Tilden","Boris Becker","Pete Sampras"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"The Los Angeles Dodgers were originally from what U.S. city?","correct_answer":"Brooklyn","incorrect_answers":["Las Vegas","Boston","Seattle"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"&quot;Stadium of Light&quot; is the home stadium for which soccer team?","correct_answer":"Sunderland FC","incorrect_answers":["Barcelona FC","Paris Saints-Germain","Manchester United"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"Who won the UEFA Champions League in 2017?","correct_answer":"Real Madrid C.F.","incorrect_answers":["Atletico Madrid","AS Monaco FC","Juventus F.C."]}]}';
const jsonData = JSON.parse(quizData);
const quizScore = document.querySelector('.quiz-score h2');
const quizOrder = document.querySelector('.quiz-score h3');
const quizCategory = document.querySelector('.category-text h3');
const quizLevel = document.querySelector('.difficulty-text h3');
const quizQuestion = document.querySelector('.quiz-question p');
const quizForm = document.querySelector('.question-form');
const quizOptionLabels = document.querySelectorAll('.question-form label');
const quizOptionInput = document.querySelectorAll('.question-form input');
const submitButtons = document.querySelectorAll('.question-form .submit');
const nextButton = document.querySelector('.next-button');
const correctAlert = document.querySelector('.correct-alert');
const wrongAlert = document.querySelector('.wrong-alert');
const redoButton = document.querySelector('.redo-button');

var mainInteration = 0;
var userScore = 0;

window.onload = () => {
    questionArray  = shuffleArray(jsonData.results);
    currentQuestion = questionArray[mainInteration];
    displayQuiz(currentQuestion);
}

function shuffleArray(array) {
    var shuffledArray = array
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    return(shuffledArray);
}

function displayQuiz(questionArray) {
    quizOrder.innerHTML = `${mainInteration }/${jsonData.results.length}`;
    if (mainInteration == jsonData.results.length) {
        return handleIfOutOfQuestion();
    }
    submitButtons.forEach(button => {
        button.style.display = "inline-block"
    });

    wrongAlert.style.display = "none";
    correctAlert.style.display = "none";

    const corectAnswer = document.querySelector('.correct_answer');
    if (corectAnswer) {
        corectAnswer.classList.remove('correct-answer-reveal');
        corectAnswer.classList.remove('correct_answer');

    }
    const wrongAnswers = document.querySelectorAll('.wrong_answer');
    if (wrongAnswers.length > 0 ) {
        wrongAnswers.forEach(element => {
            element.classList.remove('wrong_answer')
        });
    }
    quizCategory.innerText = questionArray.category;
    quizLevel.innerText = questionArray.difficulty;
    quizQuestion.innerText = questionArray.question;

    let answersArray = questionArray.incorrect_answers
    answersArray.push(questionArray.correct_answer);
    let shuffleAnswerArray = shuffleArray(answersArray);
    for (i = 0; i < shuffleAnswerArray.length; i++) {
        quizOptionLabels[i].innerText = shuffleAnswerArray[i];
        quizOptionInput[i].value = shuffleAnswerArray[i];
        if (shuffleAnswerArray[i] == currentQuestion.correct_answer) {
            quizOptionLabels[i].classList.add("correct_answer");
        } else {
            quizOptionLabels[i].classList.add("wrong_answer");
        }
    }
}

quizForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const corectAnswer = document.querySelector('.correct_answer');
    submitButtons.forEach(button => {
        button.style.display = "none";
    });
    nextButton.style.display = "block"

    console.log(currentQuestion);
    let userAnswer = quizForm.answer.value;
    if (userAnswer.length > 0) {
        if (userAnswer == currentQuestion.correct_answer) {
            correctAlert.style.display = "inline-block";
            userScore++;
            quizScore.innerHTML = userScore;
        } else {
            wrongAlert.style.display = "block"
            corectAnswer.classList.add('correct-answer-reveal');
        }
    } else {
        corectAnswer.classList.add('correct-answer-reveal');
        wrongAlert.style.display = "block";
        wrongAlert.innerHTML = "You gotta pick an answer to score!"
    }
})
nextButton.addEventListener('click', function () {
    nextButton.style.display = "none";
    mainInteration++;
    currentQuestion = questionArray[mainInteration];
    displayQuiz(currentQuestion);

})
function handleIfOutOfQuestion() {
    alert(`Out of questions: Your total score is ${userScore}/${jsonData.results.length} `);
    redoButton.style.display = "block";
}
redoButton.addEventListener('click', () => {
    location.reload();
})
