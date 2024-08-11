document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("player-form").addEventListener("submit", startGame);
    document.getElementById("restart-game").addEventListener("click", restartGame);
});

let players = [];
let currentPlayerIndex = 0;
let score = 0;
let currentStation = 1;

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

    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    document.getElementById("welcome-message").textContent = `¡Hola ${players[currentPlayerIndex]}! Bienvenido a Quién Quiere Ser Millonario.`;
    generateQuestion();
}

function generateQuestion() {
    // Implementación de la generación de preguntas
}

function restartGame() {
    document.getElementById("game-section").style.display = "none";
    document.getElementById("end-section").style.display = "none";
    document.getElementById("welcome-section").style.display = "block";

    document.getElementById("player-form").reset();
}