var rgbSyntaxEl = document.getElementById("rgbSyntax");
var easyBtnEl = document.getElementById("easyBtn");
var hardBtnEl = document.getElementById("hardBtn");
var getColorsBtnEl = document.getElementById("getColorsBtn");
var colorsContainerEl = document.getElementById("colorsContainer");

var levels = {
  easy: {
    name: "easy",
    numberOfCards: 3,
  },
  hard: {
    name: "hard",
    numberOfCards: 6,
  },
};

var selectedLevel = "easy";
var correctAnswer = "";

// Generate Random Color
function generateColor() {
  var red = Math.trunc(Math.random() * 256);
  var green = Math.trunc(Math.random() * 256);
  var blue = Math.trunc(Math.random() * 256);
  var color = `rgb(${red},${green},${blue})`;
  // rgbSyntaxEl.style.color = color;
  return color;
}

// Generate cards according to level
function askQuestion(level) {
  var numberCards = levels[level].numberOfCards;
  var colors = [];
  for (var i = 1; i <= numberCards; i++) {
    colors.push(generateColor());
  }

  correctAnswer = colors[Math.trunc(Math.random() * numberCards)];
  rgbSyntaxEl.innerHTML = correctAnswer;
  //   console.log(colors);
  dispalyCards(colors);
}

function dispalyCards(colorArr) {
  var colorCardsHTML = "";
  for (var i = 0; i < colorArr.length; i++) {
    colorCardsHTML += `
    <div class="color-card col-md-4">
    <div class="inner h-100 rounded"
     style="background-color:${colorArr[i]}">
     </div>
    </div>
    `;
  }
  colorsContainerEl.innerHTML = `
  <div class="row g-4 py-4">
  ${colorCardsHTML}
  </div>
  `;

  var allCards = document.querySelectorAll(".color-card .inner");
  for (var i = 0; i < allCards.length; i++) {
    allCards[i].onclick = checkAnswer;
  }
}

function checkAnswer(event) {
  console.log(event.target.style.backgroundColor);
  console.log(correctAnswer);
  if (event.target.style.backgroundColor === correctAnswer) {
    alert("Congratulation");
    askQuestion(selectedLevel);
  } else {
    event.target.style.display = "none";
    alert("try again 🔁 ");
  }
}
askQuestion(selectedLevel);
