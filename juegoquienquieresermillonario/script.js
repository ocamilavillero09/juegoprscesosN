document.getElementById("player-form").addEventListener("submit", startGame);
document.getElementById("use-5050").addEventListener("click", useHelp5050);
document.getElementById("use-change-question").addEventListener("click", changeQuestion);
document.getElementById("retire-yes").addEventListener("click", retireGame);
document.getElementById("retire-no").addEventListener("click", continueGame);
document.getElementById("restart-game").addEventListener("click", restartGame);

let player = "";
let score = 0;
let currentStation = 1;
let fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
let used5050 = false;
let usedChangeQuestion = false;

let questions = [
    { question: "¿Cuál es la capital de Francia?", answers: ["París", "Londres", "Berlín", "Roma"], correct: 0 },
    { question: "¿Quién pintó la Mona Lisa?", answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correct: 2 },
    { question: "¿Cuál es el planeta más cercano al Sol?", answers: ["Venus", "Marte", "Mercurio", "Júpiter"], correct: 2 },
    { question: "¿Qué año comenzó la Segunda Guerra Mundial?", answers: ["1914", "1939", "1945", "1929"], correct: 1 },
    { question: "¿Quién escribió 'Cien años de soledad'?", answers: ["Gabriel García Márquez", "Jorge Luis Borges", "Pablo Neruda", "Mario Vargas Llosa"], correct: 0 },
    { question: "¿Cuál es el metal más abundante en la Tierra?", answers: ["Hierro", "Aluminio", "Oro", "Plata"], correct: 1 },
    { question: "¿Qué país ganó la Copa Mundial de Fútbol en 2018?", answers: ["Brasil", "Francia", "Alemania", "Argentina"], correct: 1 },
    { question: "¿Cuál es el río más largo del mundo?", answers: ["Nilo", "Amazonas", "Yangtsé", "Mississippi"], correct: 1 },
    { question: "¿Quién inventó la bombilla eléctrica?", answers: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Benjamin Franklin"], correct: 0 },
    { question: "¿Cuál es el océano más grande?", answers: ["Atlántico", "Índico", "Pacífico", "Ártico"], correct: 2 },
    { question: "¿Qué tipo de animal es la ballena?", answers: ["Pez", "Mamífero", "Reptil", "Anfibio"], correct: 1 },
    { question: "¿Quién es el autor de 'Don Quijote de la Mancha'?", answers: ["Miguel de Cervantes", "William Shakespeare", "Dante Alighieri", "Lope de Vega"], correct: 0 },
    { question: "¿Cuál es el país más grande del mundo?", answers: ["China", "Estados Unidos", "Rusia", "Canadá"], correct: 2 },
    { question: "¿Cuál es el idioma más hablado en el mundo?", answers: ["Español", "Inglés", "Mandarín", "Hindi"], correct: 2 },
    { question: "¿Qué año se fundó Google?", answers: ["1995", "1998", "2000", "2004"], correct: 1 },
];

let usedQuestions = [];
let currentQuestion = {};

function startGame(event) {
    event.preventDefault();
    player = document.getElementById("player").value;
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    document.getElementById("welcome-message").textContent = ¡Hola ${player}! Bienvenido a Quién Quiere Ser Millonario.;
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

    document.getElementById("station").textContent = Estación: ${currentStation};
}

function shuffleAnswers(answers) {
    let shuffled = [...answers];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor