document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");

    startButton.addEventListener("click", function(event) {
        event.preventDefault();
        startGame();
    });
});

function startGame() {
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    const player3 = document.getElementById("player3").value;

    if (player1 && player2 && player3) {
        document.getElementById("welcome-section").style.display = "none";
        document.getElementById("game-section").style.display = "block";

        document.getElementById("welcome-message").textContent = `¡Hola ${player1}, ${player2} y ${player3}! Bienvenidos a ¿Quién Quiere Ser Millonario?`;
        generateQuestion();
    } else {
        alert("Por favor, ingresa los nombres de todos los jugadores.");
    }
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