document.getElementById("player-form").addEventListener("submit", startGame);

let player = "";

function startGame(event) {
    event.preventDefault();
    player = document.getElementById("player").value;
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    document.getElementById("welcome-message").textContent = `¡Hola ${player}! Bienvenido a Quién Quiere Ser Millonario.`;
    // Generar la primera pregunta
    generateQuestion();
}

function generateQuestion() {
    // Aquí iría la lógica para generar y mostrar la pregunta
    document.getElementById("question").textContent = "¿Qué año comenzó la Segunda Guerra Mundial?";
    let answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";
    let answers = ["1914", "1939", "1945", "1929"];
    answers.forEach((answer, index) => {
        let button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index));
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    // Lógica para verificar la respuesta y proceder con el juego
    alert(`Has seleccionado la opción ${selectedIndex + 1}`);
}