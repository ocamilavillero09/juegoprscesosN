document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-game");
    const retireYesButton = document.getElementById("retire-yes");
    const retireNoButton = document.getElementById("retire-no");
    const use5050Button = document.getElementById("use-5050");
    const changeQuestionButton = document.getElementById("use-change-question");

    startButton.addEventListener("click", function(event) {
        event.preventDefault();
        startGame();
    });

    restartButton.addEventListener("click", restartGame);
    retireYesButton.addEventListener("click", retireGame);
    retireNoButton.addEventListener("click", continueGame);
    use5050Button.addEventListener("click", use5050);
    changeQuestionButton.addEventListener("click", changeQuestion);
});

let players = [];
let currentStation = 1;
let score = 0;
let currentQuestion = null;
let used5050 = false;
let usedChangeQuestion = false;

const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

let questions = [
    {
        question: "¿Cuál es el planeta más cercano al Sol?",
        answers: ["Mercurio", "Venus", "Tierra", "Marte"],
        correctAnswer: 0
    },
    {
        question: "¿Cuál es el océano más grande del mundo?",
        answers: ["Atlántico", "Índico", "Pacífico", "Ártico"],
        correctAnswer: 2
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2
    }
    // Agrega más preguntas según sea necesario
];

function startGame() {
    players = [
        document.getElementById("player1").value,
        document.getElementById("player2").value,
        document.getElementById("player3").value
    ];

    if (players.every(player => player)) {
        document.getElementById("welcome-section").style.display = "none";
        document.getElementById("game-section").style.display = "block";
        
        document.getElementById("welcome-message").textContent = `¡Hola ${players.join(", ")}! Bienvenidos a ¿Quién Quiere Ser Millonario?`;
        
        currentStation = 1;
        score = 0;
        used5050 = false;
        usedChangeQuestion = false;
        updateScoreAndStation();
        generateQuestion();
    } else {
        alert("Por favor, ingresa los nombres de todos los jugadores.");
    }
}

function generateQuestion() {
    if (currentStation <= 10 && questions.length > 0) {
        let questionIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = questions.splice(questionIndex, 1)[0];

        document.getElementById("question").textContent = currentQuestion.question;

        let answersContainer = document.getElementById("answers");
        answersContainer.innerHTML = "";

        currentQuestion.answers.forEach((answer, index) => {
            let button = document.createElement("button");
            button.textContent = answer;
            button.addEventListener("click", () => checkAnswer(index));
            answersContainer.appendChild(button);
        });
    } else {
        endGame("¡Felicidades, has completado el juego!");
    }
}

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score += fibonacci[currentStation - 1];
        currentStation++;

        if (currentStation === 5 || currentStation === 7) {
            offerRetire();
        } else {
            updateScoreAndStation();
            generateQuestion();
        }
    } else {
        endGame("Respuesta incorrecta. Has perdido el juego.");
    }
}

function updateScoreAndStation() {
    document.getElementById("score").textContent = `Puntaje: ${score}`;
    document.getElementById("station").textContent = `Estación: ${currentStation}`;
}

function offerRetire() {
    document.getElementById("game-section").style.display = "none";
    document.getElementById("retire-section").style.display = "block";
}

function retireGame() {
    endGame(`Te has retirado con un puntaje de ${score}.`);
}

function continueGame() {
    document.getElementById("retire-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    generateQuestion();
}

function endGame(message) {
    document.getElementById("game-section").style.display = "none";
    document.getElementById("retire-section").style.display = "none";
    document.getElementById("end-section").style.display = "block";
    document.getElementById("end-message").textContent = message;
}

function restartGame() {
    document.getElementById("end-section").style.display = "none";
    document.getElementById("welcome-section").style.display = "block";
    questions = [
        {
            question: "¿Cuál es el planeta más cercano al Sol?",
            answers: ["Mercurio", "Venus", "Tierra", "Marte"],
            correctAnswer: 0
        },
        {
            question: "¿Cuál es el océano más grande del mundo?",
            answers: ["Atlántico", "Índico", "Pacífico", "Ártico"],
            correctAnswer: 2
        },
        {
            question: "¿Quién pintó la Mona Lisa?",
            answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: 2
        }
        // Agrega más preguntas según sea necesario
    ];
}

function use5050() {
    if (!used5050) {
        let incorrectAnswers = [];
        for (let i = 0; i < currentQuestion.answers.length; i++) {
            if (i !== currentQuestion.correctAnswer) {
                incorrectAnswers.push(i);
            }
        }
        incorrectAnswers.sort(() => Math.random() - 0.5).splice(0, 2).forEach(index => {
            document.querySelectorAll("#answers button")[index].disabled = true;
        });
        used5050 = true;
        use5050Button.disabled = true;
    } else {
        alert("Ohh lo siento ya no la puedes usar");
    }
}

function changeQuestion() {
    if (!usedChangeQuestion) {
        generateQuestion();
        usedChangeQuestion = true;
        changeQuestionButton.disabled = true;
    } else {
        alert("Ohh lo siento ya no la puedes usar");
    }
}