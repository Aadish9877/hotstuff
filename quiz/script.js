const questions = [
  {
    q: "What is HotStuff mainly used for?",
    options: [
      "NFT minting",
      "Blockchain consensus",
      "Crypto trading",
      "Wallet security"
    ],
    answer: 1
  },
  {
    q: "Which problem does HotStuff improve over older BFT protocols?",
    options: [
      "High gas fees",
      "Slow finality & communication",
      "Token inflation",
      "Energy consumption"
    ],
    answer: 1
  },
  {
    q: "HotStuff was originally designed for which project?",
    options: [
      "Ethereum",
      "Bitcoin",
      "Diem (Libra)",
      "Solana"
    ],
    answer: 2
  },
  {
    q: "What makes HotStuff scalable?",
    options: [
      "Proof of Work",
      "Linear communication",
      "Sharding",
      "Central authority"
    ],
    answer: 1
  },
  {
    q: "HotStuff belongs to which category?",
    options: [
      "DEX protocol",
      "Layer 2 solution",
      "BFT consensus protocol",
      "Wallet framework"
    ],
    answer: 2
  }
];

let index = 0;
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

startBtn.onclick = () => {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  loadQuestion();
};

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.textContent = "30s";

  const q = questions[index];
  questionEl.textContent = q.q;
  progressEl.textContent = `Question ${index + 1}/${questions.length}`;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
      <span class="option-text">${opt}</span>
    `;
    div.onclick = () => selectOption(div, i);
    optionsEl.appendChild(div);
  });

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft + "s";
    if (timeLeft === 0) showCorrectAndNext();
  }, 1000);
}

function selectOption(selectedEl, selectedIndex) {
  clearInterval(timer);

  const correctIndex = questions[index].answer;
  const allOptions = [...optionsEl.children];

  // Disable further clicks
  allOptions.forEach(opt => opt.onclick = null);

  // Always show correct answer
  allOptions[correctIndex].classList.add("correct");

  // If user is wrong → mark selected as wrong
  if (selectedIndex !== correctIndex) {
    selectedEl.classList.add("wrong");
  } else {
    score++;
  }

  setTimeout(nextQuestion, 1500);
}

function showCorrectAndNext() {
  const correctIndex = questions[index].answer;
  optionsEl.children[correctIndex].classList.add("correct");
  setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
  index++;
  if (index < questions.length) {
    loadQuestion();
  } else {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    scoreText.textContent = `You scored ${score} out of ${questions.length}`;
  }
}
