const questions = {
  easy: [
    { question: "ما هو الشيء الذي تذبحه وتبكي عليه؟", answers: ["الخروف", "البصل", "الوردة", "الفلفل"], correct: "البصل" },
    { question: "شيء كلما أخذت منه زاد، ما هو؟", answers: ["العلم", "الحفرة", "المال", "الوقت"], correct: "الحفرة" },
    { question: "ما هو الشيء الذي له رقبة ولكن ليس له رأس؟", answers: ["الزجاجة", "المروحة", "الوسادة", "القميص"], correct: "الزجاجة" },
    { question: "ما هو الشيء الذي لا يمشي إلا بالضرب؟", answers: ["الحصان", "المسمار", "العصا", "القفل"], correct: "المسمار" },
    { question: "ما هو الشيء الذي يسمع بلا أذن ويتكلم بلا لسان؟", answers: ["الكمبيوتر", "الراديو", "الساعة", "الهاتف"], correct: "الهاتف" }
  ],
  medium: [
    { question: "ما هو الرقم الذي إذا ضربته في نفسه ثم أضفت إليه الناتج يصبح 20؟", answers: ["3", "4", "5", "6"], correct: "4" },
    { question: "لديك قطة في كل زاوية من الغرفة، وكل قطة ترى 3 قطط، كم عدد القطط؟", answers: ["3", "4", "6", "8"], correct: "4" },
    { question: "رجل لديه 4 بنات، ولكل بنت أخ، كم عدد الأولاد؟", answers: ["4", "1", "2", "5"], correct: "1" },
    { question: "شيء في السماء إذا أضفت له حرفًا أصبح في الأرض؟", answers: ["نجم", "قمر", "سحاب", "شمس"], correct: "نجم" }
  ],
  hard: [
    { question: "قطار يسير باتجاه الشمال، والرياح تهب من الجنوب، إلى أين يتجه الدخان؟", answers: ["للشمال", "للجنوب", "للأعلى", "لا يوجد دخان"], correct: "لا يوجد دخان" },
    { question: "إذا كان الأمس هو غد اليوم، فمتى يكون اليوم؟", answers: ["الأحد", "الجمعة", "السبت", "الاثنين"], correct: "الأحد" },
    { question: "رجل خرج تحت المطر بدون مظلة أو قبعة ولم يبتل شعره، لماذا؟", answers: ["كان أصلع", "المطر خفيف", "كان سريعًا", "لبس معطفًا"], correct: "كان أصلع" },
    { question: "ما هو الشيء الذي لا يمكنك الإمساك به أكثر من ثوانٍ؟", answers: ["النار", "الوقت", "أنفاسك", "الريح"], correct: "أنفاسك" }
  ]
};


let currentLevel = "";
let currentQuestion = 0;
let score = 0;
let timerInterval;
let timeLeft = 10;

const answerButtons = document.querySelectorAll(".answer-button");
const nextButton = document.getElementById("next-button");

function showLevelScreen() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("level-selection").style.display = "flex";
}

function startQuiz(level) {
  currentLevel = level;
  currentQuestion = 0;
  score = 0;
  document.getElementById("level-selection").style.display = "none";
  document.getElementById("quiz").style.display = "flex";
  loadQuestion();
}

function loadQuestion() {
  // ⏹️ 1. Réinitialiser le temps minuteur
  clearInterval(timerInterval);
  timeLeft = 10;
  // 🔽 Cacher le bouton "Suivant" et réinitialiser les messages/effets
  nextButton.style.display = "none";
  document.getElementById("response-message").textContent = "";
  document.getElementById("timer").classList.remove("red-timer");
   // ❓ 2. Afficher la question actuelle
  const currentQ = questions[currentLevel][currentQuestion];
  document.getElementById("question").textContent = currentQ.question;
   // 🧠 3. Afficher les réponses, réactiver les boutons et préparer les clics
  answerButtons.forEach((btn, index) => {
    const answer = currentQ.answers[index];
    btn.style.display = "block";
    btn.textContent = answer;
    btn.classList.remove("correct-answer", "incorrect-answer");
    btn.disabled = false;
    // 🖱️ Quand on clique, vérifier la réponse
    btn.onclick = () => checkAnswer(btn, currentQ.correct);
  });
    // 📊 Afficher le score actuel
  document.getElementById("score").textContent = "النقاط: " + score;
   // ⏱️ 4. Lancer le compte à rebours pour cette question
  startTimer();
}

function checkAnswer(btn, correctAnswer) {
clearInterval(timerInterval); // Arrête le compte à rebours dès qu'une réponse est donnée
answerButtons.forEach(b => b.disabled = true); // Désactive tous les boutons pour empêcher plusieurs clics

// Vérifie si la réponse sélectionnée est correcte
if (btn.textContent === correctAnswer) {
btn.classList.add("correct-answer"); // Colore le bouton en vert (bonne réponse)
document.getElementById("correctSound").play(); // Joue le son pour une bonne réponse
score++; // Incrémente le score
document.getElementById("response-message").textContent = "إجابة صحيحة!"; // Affiche un message de succès
} else {
btn.classList.add("incorrect-answer"); // Colore le bouton sélectionné en rouge (mauvaise réponse)
document.getElementById("wrongSound").play(); // Joue le son pour une mauvaise réponse
document.getElementById("response-message").textContent = "إجابة خاطئة!"; // Affiche un message d'erreur

// Colore en vert la bonne réponse pour que le joueur la voie
answerButtons.forEach(button => {
  if (button.textContent === correctAnswer) {
    button.classList.add("correct-answer");
  }
});
}

// Met à jour le score affiché à l'écran
document.getElementById("score").textContent = "النقاط: " + score;

// Affiche le bouton "Suivant" pour passer à la prochaine question
nextButton.style.display = "block";
}
function startTimer() {
// Lance un minuteur qui s’exécute chaque seconde (1000ms)
timerInterval = setInterval(() => {
// Réduit le temps restant d'une seconde
timeLeft--;
console.log(timeLeft);

// Récupère l'élément HTML où s’affiche le temps
const timerEl = document.getElementById("timer");

// Met à jour l’affichage du temps restant
timerEl.textContent = "الوقت: " + timeLeft + " ثوان";

// Si le temps est écoulé (0 seconde ou moins), on arrête le minuteur et on appelle la fonction de gestion du temps écoulé
if (timeLeft <= 3) {
  timerEl.classList.add("red-timer");
   // Appelle la fonction qui gère la fin du temps
    
    document.getElementById("timeoutSound").play();
    if (timeLeft == 0){
      handleTimeOut();
      clearInterval(timerInterval); // Arrête le minuteur
    }
  
}

}, 1000); // Fin du setInterval (chaque 1 seconde)
}


function handleTimeOut() {
  //Joue le son "temps écoulé"

  //Affiche la bonne réponse
  const correctAnswer = questions[currentLevel][currentQuestion].correct;

  // utilise une boucle forEach pour parcourir tous les boutons de réponse (answerButtons).
  answerButtons.forEach(btn => {
    //Désactive les boutons
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
        btn.classList.add("correct-answer");
    } else {
      btn.classList.add("incorrect-answer");
    }
  });
  
// ⏱️ Affiche le message indiquant que le temps est écoulé
  document.getElementById("response-message").textContent = "انتهى الوقت!";
  //Affiche le bouton "Suivant"
  nextButton.style.display = "block";
}

function nextQuestion() {
// ➕ Incrémente l’indice de la question actuelle (passe à la question suivante)
currentQuestion++;

// ✅ Vérifie s'il reste encore des questions dans le niveau sélectionné
if (currentQuestion < questions[currentLevel].length) {
// ▶️ Si oui, charge la prochaine question
loadQuestion();
} else {
// 🏁 Si c’est la dernière question, termine le quiz
endGame();
}
}

//Affiche l’écran de fin avec le score total
function endGame() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("end-screen").style.display = "flex";
  document.getElementById("final-message").textContent = `لقد أكملت اللعبة! النتيجة النهائية: ${score} نقاط`;
}
//Rejouer le niveau
function restartLevel() {
  //Relance le même niveau à partir du début
  currentQuestion = 0;
  score = 0;
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("quiz").style.display = "flex";
  loadQuestion();
}
//Quand la page est chargée, seul l’écran d’accueil est visible
window.onload = () => {
  document.getElementById("start-screen").style.display = "flex";
};
