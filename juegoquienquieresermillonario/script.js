document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");

    startButton.addEventListener("click", function(event) {
        event.preventDefault();
        startGame();
    });
});

let players = [];
let currentPlayerIndex = 0;
let score = 0;
let currentStation = 1;
let used5050 = false;
let usedChangeQuestion = false;

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
        updateScoreAndStation();
        generateQuestion();
    } else {
        alert("Por favor, ingresa los nombres de todos los jugadores.");
    }
}

function generateQuestion() {
    if (currentStation <= 10) {
        let questionIndex = Math.floor(Math.random() * questions.length);
        let questionData = questions[questionIndex];

        document.getElementById("question").textContent = questionData.question;

        let answersContainer = document.getElementById("answers");
        answersContainer.innerHTML = "";

        questionData.answers.forEach((answer, index) => {
            let button = document.createElement("button");
            button.textContent = answer;
            button.addEventListener("click", () => checkAnswer(index, questionData.correctAnswer));
            answersContainer.appendChild(button);
        });

        // Eliminar la pregunta usada para que no se repita
        questions.splice(questionIndex, 1);
    } else {
        endGame("¡Felicidades, has completado el juego!");
    }
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
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
    document.getElementById("game-section").style.display = "none";
    document.getElementById("end-section").style.display = "none";
    document.getElementById("welcome-section").style.display = "block";

    document.getElementById("player-form").reset();

    // Resetear las variables y preguntas
    currentStation = 1;
    score = 0;
    used5050 = false;
    usedChangeQuestion = false;

    // Reestablece las preguntas
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