const quizSet1 = [
  {
    type: "multiple",
    question: "Which meal is the most balanced?",
    help: "Choose one answer.",
    options: [
      "Vegetables, rice, chicken, and water",
      "Only soda and chips",
      "Only cake"
    ],
    correct: 0
  },
  {
    type: "truefalse",
    question: "Water is usually a healthy drink choice with meals.",
    help: "Choose true or false.",
    options: ["True", "False"],
    correct: 0
  },
  {
    type: "dragdrop",
    question: "Drag the food into the correct group.",
    help: "Drag the card to the best matching category.",
    item: "Spinach",
    zones: ["Vegetables", "Fruits", "Protein"],
    correctZone: "Vegetables"
  },
  {
    type: "multiple",
    question: "Which food is a protein choice?",
    help: "Choose one answer.",
    options: ["Salmon", "Blueberries", "Oats"],
    correct: 0
  },
  {
    type: "truefalse",
    question: "Whole grains often contain more fiber than refined grains.",
    help: "Choose true or false.",
    options: ["True", "False"],
    correct: 0
  },
  {
    type: "dragdrop",
    question: "Drag the food into the correct group.",
    help: "Drag the card to the best matching category.",
    item: "Avocado",
    zones: ["Healthy Fats", "Whole Grains", "Fruits"],
    correctZone: "Healthy Fats"
  },
  {
    type: "multiple",
    question: "Which food belongs to the fruit group?",
    help: "Choose one answer.",
    options: ["Blueberries", "Spinach", "Eggs"],
    correct: 0
  },
  {
    type: "truefalse",
    question: "Protein helps support growth and repair in the body.",
    help: "Choose true or false.",
    options: ["True", "False"],
    correct: 0
  },
  {
    type: "multiple",
    question: "Which food is a whole grain?",
    help: "Choose one answer.",
    options: ["Brown rice", "Candy", "Chicken"],
    correct: 0
  },
  {
    type: "multiple",
    question: "What is the main goal of this quiz?",
    help: "Choose one answer.",
    options: [
      "Learn basic healthy eating habits",
      "Skip reading and guess quickly",
      "Memorize very difficult words only"
    ],
    correct: 0
  }
];

const quizSet2 = [
  {
    type: "multiple",
    question: "Which nutrient helps build and repair body tissues?",
    help: "Choose one answer.",
    options: ["Carbohydrates", "Protein", "Fat", "Fiber"],
    correct: 1
  },
  {
    type: "multiple",
    question: "Which of the following foods has a low glycemic index?",
    help: "Choose one answer.",
    options: ["White bread", "Sugary cereal", "Oatmeal", "Candy"],
    correct: 2
  },
  {
    type: "multiple",
    question: "Which vitamin is mainly obtained from sunlight exposure?",
    help: "Choose one answer.",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
    correct: 2
  },
  {
    type: "multiple",
    question: "Which of the following is a whole grain?",
    help: "Choose one answer.",
    options: ["White rice", "Brown rice", "White bread", "Pasta (refined)"],
    correct: 1
  },
  {
    type: "multiple",
    question: "What is the main benefit of dietary fiber?",
    help: "Choose one answer.",
    options: ["Builds muscle", "Improves digestion", "Provides quick energy", "Adds fat"],
    correct: 1
  },
  {
    type: "truefalse",
    question: "Eating too much added sugar can increase the risk of chronic diseases.",
    help: "Choose true or false.",
    options: ["True", "False"],
    correct: 0
  },
  {
    type: "truefalse",
    question: "All fats are bad and should be completely avoided.",
    help: "Choose true or false.",
    options: ["True", "False"],
    correct: 1
  },
  {
    type: "multiple",
    question: "Which nutrient mainly gives energy to the body?",
    help: "Choose one answer.",
    options: ["Carbohydrates", "Water", "Vitamin C", "Calcium"],
    correct: 0
  },
  {
    type: "multiple",
    question: "Which food is highest in healthy fats?",
    help: "Choose one answer.",
    options: ["Avocado", "Candy", "White bread", "Soda"],
    correct: 0
  },
  {
    type: "multiple",
    question: "Which choice is lower in added sugar?",
    help: "Choose one answer.",
    options: ["Plain yogurt", "Candy bar", "Soda", "Cake"],
    correct: 0
  }
];

const allQuizSets = [quizSet1, quizSet2];

let currentQuizIndex = 0;
let activeQuiz = allQuizSets[currentQuizIndex];

const state = {
  currentQuestion: 0,
  score: 0,
  selectedAnswer: null,
  selectedZone: null,
  draggingItem: null,
  placedItems: {},
  started: false
};

const elements = {
  startQuiz: document.getElementById("startQuiz"),
  learnBtn: document.getElementById("learnBtn"),
  quizCard: document.getElementById("quizCard"),
  questionCount: document.getElementById("questionCount"),
  scoreText: document.getElementById("scoreText"),
  progressBar: document.getElementById("progressBar"),
  questionTitle: document.getElementById("questionTitle"),
  questionHelp: document.getElementById("questionHelp"),
  choicesGrid: document.getElementById("choicesGrid"),
  dragArea: document.getElementById("dragArea"),
  feedbackPanel: document.getElementById("feedbackPanel"),
  feedbackText: document.getElementById("feedbackText"),
  nextQuestion: document.getElementById("nextQuestion"),
  restartQuiz: document.getElementById("restartQuiz"),
  anotherQuiz: document.getElementById("anotherQuiz"),
  homeBtn: document.getElementById("homeBtn"),
  resultTitle: document.getElementById("resultTitle"),
  resultSummary: document.getElementById("resultSummary"),
  resultsSection: document.getElementById("results"),
  resultsActions: document.getElementById("resultsActions"),
  learnSection: document.getElementById("learnSection"),
  backHome: document.getElementById("backHome")
};

function init() {
  setupEvents();
}

function setupEvents() {
  if (elements.startQuiz) {
    elements.startQuiz.addEventListener("click", startQuizFlow);
  }

  if (elements.learnBtn) {
    elements.learnBtn.addEventListener("click", showLearn);
  }

  if (elements.nextQuestion) {
    elements.nextQuestion.addEventListener("click", goToNextQuestion);
  }

  if (elements.restartQuiz) {
    elements.restartQuiz.addEventListener("click", restartQuiz);
  }

  if (elements.anotherQuiz) {
    elements.anotherQuiz.addEventListener("click", takeAnotherQuiz);
  }

  if (elements.homeBtn) {
    elements.homeBtn.addEventListener("click", goHome);
  }

  if (elements.backHome) {
    elements.backHome.addEventListener("click", goHome);
  }
}

function resetQuizState() {
  state.started = true;
  state.currentQuestion = 0;
  state.score = 0;
  state.selectedAnswer = null;
  state.selectedZone = null;
  state.draggingItem = null;
  state.placedItems = {};

  activeQuiz = allQuizSets[currentQuizIndex];

  elements.learnSection.hidden = true;
  elements.quizCard.hidden = false;
  elements.resultsSection.hidden = true;
  elements.resultsActions.hidden = true;

  elements.resultTitle.textContent = "Complete the quiz to see your result.";
  elements.resultSummary.textContent = "Your score and a short message will appear here after question 10.";
}

function startQuizFlow() {
  currentQuizIndex = 0;
  resetQuizState();
  renderQuestion();
  document.getElementById("quiz").scrollIntoView({ behavior: "smooth", block: "start" });
}

function takeAnotherQuiz() {
  currentQuizIndex = (currentQuizIndex + 1) % allQuizSets.length;
  resetQuizState();
  renderQuestion();
  document.getElementById("quiz").scrollIntoView({ behavior: "smooth", block: "start" });
}

function restartQuiz() {
  resetQuizState();
  renderQuestion();
  document.getElementById("quiz").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderQuestion() {
  const question = activeQuiz[state.currentQuestion];
  const progress = (state.currentQuestion / activeQuiz.length) * 100;

  state.selectedAnswer = null;
  state.selectedZone = null;
  state.draggingItem = null;
  state.placedItems = {};

  elements.questionCount.textContent = `Question ${state.currentQuestion + 1} of ${activeQuiz.length}`;
  elements.scoreText.textContent = `Score: ${state.score}`;
  elements.progressBar.style.width = `${progress}%`;
  elements.questionTitle.textContent = question.question;
  elements.questionHelp.textContent = question.help;
  elements.feedbackText.textContent = "Answer the question, then press Next.";
  elements.feedbackPanel.className = "feedback-panel";
  elements.nextQuestion.textContent = state.currentQuestion === activeQuiz.length - 1 ? "Finish" : "Next";

  elements.choicesGrid.innerHTML = "";
  elements.dragArea.innerHTML = "";

  const isChoiceQuestion = question.type === "multiple" || question.type === "truefalse";
  const isSingleDragQuestion = question.type === "dragdrop";

  elements.choicesGrid.hidden = !isChoiceQuestion;
  elements.dragArea.hidden = !isSingleDragQuestion;

  if (isChoiceQuestion) {
    renderChoiceQuestion(question);
  } else if (isSingleDragQuestion) {
    renderDragQuestion(question);
  }
}

function renderChoiceQuestion(question) {
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = option;

    button.addEventListener("click", () => {
      state.selectedAnswer = index;

      document.querySelectorAll(".choice-button").forEach((item, itemIndex) => {
        item.classList.toggle("selected", itemIndex === index);
      });

      if (index === question.correct) {
        elements.feedbackText.textContent = "✅ Correct!";
        elements.feedbackPanel.className = "feedback-panel success";
      } else {
        elements.feedbackText.textContent = "❌ Try Again";
        elements.feedbackPanel.className = "feedback-panel warning";
      }
    });

    elements.choicesGrid.appendChild(button);
  });
}

function renderDragQuestion(question) {
  const wrapper = document.createElement("div");
  wrapper.className = "drag-layout";

  const source = document.createElement("div");
  source.className = "drag-source";
  source.innerHTML = '<p class="drag-label">Drag this card</p>';

  const card = document.createElement("div");
  card.className = "drag-card";
  card.draggable = true;
  card.textContent = question.item;
  card.dataset.itemName = question.item;

  card.addEventListener("dragstart", () => {
    state.draggingItem = question.item;
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    state.draggingItem = null;
  });

  source.appendChild(card);

  const zones = document.createElement("div");
  zones.className = "dropzone-grid";

  question.zones.forEach((zoneName) => {
    const zone = document.createElement("div");
    zone.className = "dropzone";
    zone.dataset.zoneName = zoneName;

    const title = document.createElement("strong");
    title.textContent = zoneName;
    zone.appendChild(title);

    zone.addEventListener("click", () => {
      placeSingleDragAnswer(zoneName, zone, question);
    });

    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("drag-over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("drag-over");
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("drag-over");
      placeSingleDragAnswer(zoneName, zone, question);
    });

    zones.appendChild(zone);
  });

  wrapper.appendChild(source);
  wrapper.appendChild(zones);
  elements.dragArea.appendChild(wrapper);
}

function placeSingleDragAnswer(zoneName, zoneElement, question) {
  state.selectedZone = zoneName;

  document.querySelectorAll(".dropzone").forEach((zone) => {
    zone.classList.remove("selected");
    zone.classList.remove("drag-over");

    const strong = zone.querySelector("strong");
    zone.innerHTML = "";
    if (strong) {
      zone.appendChild(strong);
    } else {
      const title = document.createElement("strong");
      title.textContent = zone.dataset.zoneName;
      zone.appendChild(title);
    }
  });

  zoneElement.classList.add("selected");

  const placedCard = document.createElement("div");
  placedCard.className = "drag-card";
  placedCard.textContent = question.item;
  placedCard.draggable = false;
  placedCard.style.marginTop = "0.75rem";

  zoneElement.appendChild(placedCard);

  if (zoneName === question.correctZone) {
    elements.feedbackText.textContent = "✅ Correct group. Press Next.";
    elements.feedbackPanel.className = "feedback-panel success";
  } else {
    elements.feedbackText.textContent = "❌ Not the correct group. You can try another one.";
    elements.feedbackPanel.className = "feedback-panel warning";
  }
}

function goToNextQuestion() {
  if (!state.started) return;

  const question = activeQuiz[state.currentQuestion];

  if ((question.type === "multiple" || question.type === "truefalse") && state.selectedAnswer === null) {
    elements.feedbackText.textContent = "Please choose one answer before continuing.";
    elements.feedbackPanel.className = "feedback-panel warning";
    return;
  }

  if (question.type === "dragdrop" && state.selectedZone === null) {
    elements.feedbackText.textContent = "Please drag the card or select a group before continuing.";
    elements.feedbackPanel.className = "feedback-panel warning";
    return;
  }

  let isCorrect = false;

  if (question.type === "multiple" || question.type === "truefalse") {
    isCorrect = state.selectedAnswer === question.correct;
  } else if (question.type === "dragdrop") {
    isCorrect = state.selectedZone === question.correctZone;
  }

  if (isCorrect) {
    state.score += 1;
  }

  if (state.currentQuestion === activeQuiz.length - 1) {
    state.started = false;
    showResults();
    return;
  }

  state.currentQuestion += 1;
  renderQuestion();
}

function showResults() {
  const percent = Math.round((state.score / activeQuiz.length) * 100);

  elements.scoreText.textContent = `Score: ${state.score}`;
  elements.progressBar.style.width = "100%";

  let funnyMessage = "";

  if (percent === 100) {
    funnyMessage = "🏆 Wow, are you secretly a nutrition superhero?";
  } else if (percent >= 80) {
    funnyMessage = "😎 Strong work. Your fridge would be proud.";
  } else if (percent >= 60) {
    funnyMessage = "👏 Not bad at all. You and broccoli are becoming friends.";
  } else if (percent >= 40) {
    funnyMessage = "😂 You survived. The vegetables are still judging you.";
  } else {
    funnyMessage = "🍕 Oops... time to break up with junk food for a while.";
  }

  elements.resultTitle.textContent = `You scored ${state.score} out of ${activeQuiz.length}`;
  elements.resultSummary.textContent = funnyMessage;

  elements.feedbackText.textContent = "Quiz complete. Your result is ready below.";
  elements.feedbackPanel.className = "feedback-panel success";

  elements.resultsSection.hidden = false;
  elements.resultsActions.hidden = false;

  document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function showLearn() {
  elements.quizCard.hidden = true;
  elements.resultsSection.hidden = true;
  elements.learnSection.hidden = false;

  document.getElementById("learnSection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function goHome() {
  elements.learnSection.hidden = true;
  elements.quizCard.hidden = true;
  elements.resultsSection.hidden = true;
  elements.resultsActions.hidden = true;

  document.getElementById("top").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

init();
