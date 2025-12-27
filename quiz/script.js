const questions = [
  {
    question: "What is HotStuff mainly used for?",
    options: [
      "NFT minting",
      "Blockchain consensus",
      "Crypto trading",
      "Wallet security"
    ],
    answer: 1
  },
  {
    question: "What problem does HotStuff improve compared to older BFT protocols?",
    options: [
      "High energy consumption",
      "Slow finality and complex communication",
      "High gas fees",
      "Token inflation"
    ],
    answer: 1
  },
  {
    question: "Which feature makes HotStuff scalable?",
    options: [
      "Proof of Work",
      "Linear communication",
      "Central authority",
      "Mining rewards"
    ],
    answer: 1
  },
  {
    question: "What does finality mean in HotStuff?",
    options: [
      "Transaction fee calculation",
      "A block cannot be reverted once confirmed",
      "Faster wallet sync",
      "Token burning"
    ],
    answer: 1
  },
  {
    question: "Who benefits from understanding HotStuff?",
    options: [
      "Developers",
      "Researchers",
      "Infrastructure builders",
      "All of the above"
    ],
    answer: 3
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const scoreText = document.getElementById("score-text");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.textContent = timeLeft + "s";

  const q = questions[currentQuestion];
  progressEl.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(index);
    optionsEl.appendChild(btn);
  });

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft + "s";
    if (timeLeft === 0) {
      nextQuestion();
    }
  }, 1000);
}

function selectAnswer(index) {
  if (index === questions[currentQuestion].answer) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}
