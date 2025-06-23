const quizData = [
  {
    question:
      "1. Bagaimana cara mengatakan 'Nama saya adalah' dalam bahasa Jepang?",
    a: "わたしのなまえは [nama Anda] です",
    b: "わたしは [nama Anda] です",
    c: "おはようございます",
    d: "こんにちは",
    correct: "a",
  },
  {
    question: "2. Apa arti dari salam ini? おはようございます",
    a: "Selamat malam",
    b: "Selamat pagi",
    c: "Selamat siang",
    d: "Terima kasih",
    correct: "b",
  },
  {
    question:
      "3. Bagaimana cara menanyakan 'Siapa nama Anda?' dalam bahasa Jepang?",
    a: "あなたはだれですか？",
    b: "あなたのしごとはなんですか？",
    c: "あなたのなまえはなんですか？",
    d: "あなたのかぞくは？",
    correct: "c",
  },
  {
    question:
      "4. Bagaimana cara mengatakan 'Saya berasal dari Indonesia' dalam bahasa Jepang?",
    a: "わたしはインドネシアです",
    b: "わたしはインドネシアじんです",
    c: "わたしはインドネシアへいきます",
    d: "わたしはインドネシアからきました",
    correct: "d",
  },
  {
    question:
      "5. Bagaimana cara mengatakan 'Saya seorang guru' dalam bahasa Jepang?",
    a: "わたしはがくせいです",
    b: "わたしはせんせいです",
    c: "わたしはかいしゃいんです",
    d: "わたしはしゅふです",
    correct: "b",
  },
  {
    question:
      "6. Bagaimana cara menanyakan 'Berapa umur Anda?' dalam bahasa Jepang?",
    a: "あなたはどこにすんでいますか？",
    b: "あなたはなんじですか？",
    c: "あなたはなんさいですか？",
    d: "あなたはなんねんせいですか？",
    correct: "c",
  },
];

const welcomeScreen = document.getElementById("welcome");
const quizScreen = document.getElementById("quiz");
const quizHeader = document.getElementById("question");
const aText = document.getElementById("a_text");
const bText = document.getElementById("b_text");
const cText = document.getElementById("c_text");
const dText = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next");
const resetBtn = document.getElementById("reset");
const result = document.getElementById("result");
const answerEls = document.querySelectorAll(".answer");
const currentEl = document.getElementById("current");
const totalEl = document.getElementById("total");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");

let currentQuiz = 0;
let score = 0;
let time = 30;
let timer;

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  quizHeader.innerText = currentQuizData.question;
  aText.innerText = currentQuizData.a;
  bText.innerText = currentQuizData.b;
  cText.innerText = currentQuizData.c;
  dText.innerText = currentQuizData.d;
  currentEl.innerText = currentQuiz + 1;
  totalEl.innerText = quizData.length;
  nextBtn.disabled = true;
  submitBtn.disabled = false;
  result.innerText = "";
  result.classList.remove("show");
  startTimer();
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function startTimer() {
  clearInterval(timer);
  time = 30;
  timeEl.innerText = time;
  timer = setInterval(() => {
    time--;
    timeEl.innerText = time;
    if (time <= 0) {
      clearInterval(timer);
      result.innerText = "Waktu habis! Jawaban salah.";
      result.style.color = "red";
      result.classList.add("show");
      submitBtn.disabled = true;
      nextBtn.disabled = false;
    }
  }, 1000);
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    clearInterval(timer);
    if (answer === quizData[currentQuiz].correct) {
      score++;
      result.innerText = "Benar!";
      result.style.color = "green";
    } else {
      result.innerText =
        "Salah! Jawaban yang benar adalah: " +
        quizData[currentQuiz][quizData[currentQuiz].correct];
      result.style.color = "red";
    }
    result.classList.add("show");
    submitBtn.disabled = true;
    nextBtn.disabled = false;
  } else {
    result.innerText = "Pilih jawaban terlebih dahulu!";
    result.style.color = "orange";
    result.classList.add("show");
  }
});

nextBtn.addEventListener("click", () => {
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    clearInterval(timer);
    const highScore = localStorage.getItem("highScore") || 0;
    if (score > highScore) {
      localStorage.setItem("highScore", score);
    }
    quizScreen.innerHTML = `
      <h2>Kuis Selesai!</h2>
      <p>Skor Anda: ${score}/${quizData.length}</p>
      <p>Skor Tertinggi: ${Math.max(score, highScore)}/${quizData.length}</p>
      <button onclick="location.reload()">Ulangi Kuis</button>
    `;
  }
});

resetBtn.addEventListener("click", () => {
  currentQuiz = 0;
  score = 0;
  quizScreen.style.display = "none";
  welcomeScreen.style.display = "block";
  clearInterval(timer);
});

startBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuiz();
});

totalEl.innerText = quizData.length;
