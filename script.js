let questions = [{
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Bernes-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;iframeset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2
    },
    {
        "question": "Wie stellt man Text am BESTEN fett dar?",
        "answer_1": "&lt;strong&gt;",
        "answer_2": "CSS nutzen",
        "answer_3": "&it;bold&gt;",
        "answer_4": "&lt;b&gt;",
        "right_answer": 1
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4
    },
];


let currentQuestion = 0;
let correctAnswers = 0;
let sfxSuccess = new Audio('sfx/success.mp3');
let sfxWrong = new Audio('sfx/wrong.mp3');


function init() {
    document.getElementById('numberOfQuestions').innerHTML = questions.length;
    document.getElementById('totalQuestions').innerHTML = questions.length;
    showCurrentQuestion();
}


function showCurrentQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressBar()
        showNextQuestion()
    }
}


function answer(selection) {

    let question = questions[currentQuestion];
    let selectedAnswer = selection.slice(-1);
    let idOfRightAnswer = `answer_${question.right_answer}`;

    if (correctAnswerSelected(question, selectedAnswer)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        correctAnswers++;
        sfxSuccess.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        sfxWrong.play();
    }
    document.getElementById('nextButton').disabled = false;
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('nextButton').disabled = true;
    resetAnswerButtons();
    showCurrentQuestion();
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_1').parentNode.classList.remove('bg-success')
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_2').parentNode.classList.remove('bg-success')
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_3').parentNode.classList.remove('bg-success')
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_4').parentNode.classList.remove('bg-success')

}


function replay() {
    currentQuestion = 0;
    correctAnswers = 0;
    document.getElementById('endScreen').style = 'display: none;';
    document.getElementById('questionBody').style = '';
    document.getElementById('headImage').src = "img/pencil.jpg";
    init();
}


function showNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('question').innerHTML = question.question;
    document.getElementById('answer_1').innerHTML = question.answer_1;
    document.getElementById('answer_2').innerHTML = question.answer_2;
    document.getElementById('answer_3').innerHTML = question.answer_3;
    document.getElementById('answer_4').innerHTML = question.answer_4;
}


function showEndscreen() {
    document.getElementById('correctAnswers').innerHTML = correctAnswers;
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('headImage').src = "img/trophy.png"
    document.getElementById('progressBar').innerHTML = `100%`
    document.getElementById('progressBar').style.width = `100%`;
}


function updateProgressBar() {
    let percent = Math.round(currentQuestion / questions.length * 100);
    document.getElementById('progressBar').innerHTML = `${percent}%`
    document.getElementById('progressBar').style.width = `${percent}%`;
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function correctAnswerSelected(question, selectedAnswer) {
    return selectedAnswer == question['right_answer'];
}