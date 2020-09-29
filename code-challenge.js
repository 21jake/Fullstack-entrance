var questionArray = "";

const quizData = '{"response_code":0,"results":[{"category":"Sports","type":"multiple","difficulty":"easy","question":"How many soccer players should be on the field at the same time?","correct_answer":"22","incorrect_answers":["20","24","26"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"Who is often called &quot;the Maestro&quot; in the men&#039;s tennis circuit?","correct_answer":"Roger Federer","incorrect_answers":["Bill Tilden","Boris Becker","Pete Sampras"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"The Los Angeles Dodgers were originally from what U.S. city?","correct_answer":"Brooklyn","incorrect_answers":["Las Vegas","Boston","Seattle"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"&quot;Stadium of Light&quot; is the home stadium for which soccer team?","correct_answer":"Sunderland FC","incorrect_answers":["Barcelona FC","Paris Saints-Germain","Manchester United"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"Who won the UEFA Champions League in 2017?","correct_answer":"Real Madrid C.F.","incorrect_answers":["Atletico Madrid","AS Monaco FC","Juventus F.C."]}]}';
const jsonData = JSON.parse(quizData);
const quizScore = document.querySelector('.quiz-score h2');
const quizCategory = document.querySelector('.category-text h3');
const quizLevel = document.querySelector('.difficulty-text h3');
const quizQuestion = document.querySelector('.quiz-question p');
const quizForm = document.querySelector('.question-form');
const quizOptionLabels = document.querySelectorAll('.question-form label');
const quizOptionInput = document.querySelectorAll('.question-form input');

var mainInteration = 0;

window.onload = () => {
     questionArray  = shuffleArray(jsonData.results);
    var currentQuestion = questionArray[mainInteration];
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
    
    quizCategory.innerText = questionArray.category;
    quizLevel.innerText = questionArray.difficulty;
    quizQuestion.innerText = questionArray.question;

    let answersArray = questionArray.incorrect_answers
    answersArray.push(questionArray.correct_answer);
    let shuffleAnswerArray = shuffleArray(answersArray);

    for (i = 0; i < shuffleAnswerArray.length; i++) {
        quizOptionLabels[i].innerText = shuffleAnswerArray[i];
        quizOptionInput[i].value = shuffleAnswerArray[i];
    }
    console.log(questionArray);

}

quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let userAnswer = quizForm.answer.value;
    console.log(questionArray);
})
console.log(questionArray);
// function checkUserAnwser(answer) {


// }
