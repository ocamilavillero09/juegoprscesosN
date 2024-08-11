document.getElementById("player-form").addEventListener("submit", startGame);
document.getElementById("use-5050").addEventListener("click", useHelp5050);
document.getElementById("use-change-question").addEventListener("click", changeQuestion);
document.getElementById("retire-yes").addEventListener("click", retireGame);
document.getElementById("retire-no").addEventListener("click", continueGame);
document.getElementById("restart-game").addEventListener("click", restartGame);

let players = [];
let currentPlayerIndex = 0;
let score = 0;
let currentStation = 1;
let used5050 = false;
let usedChangeQuestion = false;

let fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

let questions = [
    { question: "¿Cuál es la capital de Francia?", answers: ["París", "Londres", "Berlín", "Roma"], correct: 0 },
    { question: "¿Quién pintó la Mona Lisa?", answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correct: 2 },
    { question: "¿Cuál es el planeta más cercano al Sol?", answers: ["Venus", "Marte", "Mercurio", "Júpiter"], correct: 2 },
    // Agrega más preguntas según sea necesario
];

let usedQuestions = [];
let currentQuestion = {};

function startGame(event) {
    event.preventDefault();
    players = [
        document.getElementById("player1").value,
        document.getElementById("player2").value,
        document.getElementById("player3").value
    ];
    currentPlayerIndex = 0;
    score = 0;
    currentStation = 1;
    used5050 = false;
    usedChangeQuestion = false;
    usedQuestions = [];
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    document.getElementById("welcome-message").textContent = `¡Hola ${players[currentPlayerIndex]}! Bienvenido a Quién Quiere Ser Millonario.`;
    generateQuestion();
}

function generateQuestion() {
    let availableQuestions = questions.filter((_, index) => !usedQuestions.includes(index));
    let randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];
    usedQuestions.push(questions.indexOf(currentQuestion));

    document.getElementById("question").textContent = currentQuestion.question;
    let answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";

    let shuffledAnswers = shuffleAnswers(currentQuestion.answers);
    shuffledAnswers.forEach((answer, index) => {
        let button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index, shuffledAnswers));
        answersContainer.appendChild(button);
    });

    document.getElementById("station").textContent = `Estación: ${currentStation}`;
}

function shuffleAnswers(answers) {
    let shuffled = [...answers];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function checkAnswer(selectedIndex, shuffledAnswers) {
    let correctAnswerIndex = currentQuestion.correct;
    let correctAnswer = currentQuestion.answers[correctAnswerIndex];
    let selectedAnswer = shuffledAnswers[selectedIndex];

    if (selectedAnswer === correctAnswer) {
        score += fibonacci[currentStation - 1];
        document.getElementById("score").textContent = `Puntaje: ${score}`;
        currentStation++;
        if (currentStation > 10) {
            endGame(true);
        } else if (currentStation === 5 || currentStation === 7) {
            showRetireOption();
        } else {
            generateQuestion();
        }
    } else {
        endGame(false);
    }
}

function showRetireOption() {
    document.getElementById("retire-section").style.display = "block";
}

function retireGame() {
    endGame(true, `Te has retirado con ${score} puntos.`);
}

function continueGame() {
    document.getElementById("retire-section").style.display = "none";
    generateQuestion();
}

function useHelp5050() {
    if (used5050) {
        alert("Ohh lo siento, ya no puedes usar esta ayuda.");
        return;
    }

    used5050 = true;
    document.getElementById("use-5050").disabled = true;

    let correctIndex = currentQuestion.correct;
    let incorrectIndexes = [];

    for (let i = 0; i < currentQuestion.answers.length; i++) {
        if (i !== correctIndex) incorrectIndexes.push(i);
    }

    while (incorrectIndexes.length > 1) {
        let randomIndex = Math.floor(Math.random() * incorrectIndexes.length);
        incorrectIndexes.splice(randomIndex, 1);
    }

    let buttons = document.querySelectorAll("#answers button");
    buttons.forEach((button, index) => {
        if (incorrectIndexes.includes(index) || index === correctIndex) return;
        button.disabled = true;
        button.style.opacity = 0.5;
    });
}

function changeQuestion() {
    if (usedChangeQuestion) {
        alert("Ohh lo siento, ya no puedes usar esta ayuda.");
        return;
    }

    usedChangeQuestion = true;
    document.getElementById("use-change-question").disabled = true;
    generateQuestion();
}

function endGame(win, message) {
    document.getElementById("question-section").style.display = "none";
    document.getElementById("retire-section").style.display = "none";
    document.getElementById("end-section").style.display = "block";
    
    if (win) {
        document.getElementById("end-message").textContent = message || `¡Felicidades ${players[currentPlayerIndex]}, has ganado con ${score} puntos!`;
    } else {
        document.getElementById("end-message").textContent = `Lo siento ${players[currentPlayerIndex]}, has perdido.`;
    }
}

function restartGame() {
    // Resetear todas las variables a su estado inicial
    currentPlayerIndex = 0;
    score = 0;
    currentStation = 1;
    used5050 = false;
    usedChangeQuestion = false;
    usedQuestions = [];

    // Resetear la interfaz
    document.getElementById("score").textContent = `Puntaje: ${score}`;
    document.getElementById("station").textContent = `Estación: ${currentStation}`;
    document.getElementById("use-5050").disabled = false;
    document.getElementById("use-change-question").disabled = false;

    // Volver a la pantalla de bienvenida para reiniciar el juego con nuevos jugadores
    document.getElementById("end-section").style.display = "none";
    document.getElementById("welcome-section").style.display = "block";
    document.getElementById("game-section").style.display = "none";
}