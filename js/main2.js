var easyBtnEl = document.getElementById("easyBtn");
var hardBtnEl = document.getElementById("hardBtn");
var rgbSyntaxEL = document.getElementById("rgbSyntax");
var colorsContainerEl = document.getElementById("colorsContainer");
var getColorsBtnEl = document.getElementById("getColorsBtn");

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

// * generate random color
function generateColor() {
  var red = Math.trunc(Math.random() * 256);
  var green = Math.trunc(Math.random() * 256);
  var blue = Math.trunc(Math.random() * 256);

  var color = `rgb(${red}, ${green}, ${blue})`;
  //   rgbSyntaxEl.style.color = color;

  return color;
}

// * generate and display color cards according to level
// ^ easy => 3
// ^ Hard => 6

function askQuestion(level) {
  var numberCards = levels[level].numberOfCards;
  var colors = [];

  for (var i = 1; i <= numberCards; i++) {
    colors.push(generateColor());
  }

  correctAnswer = colors[Math.trunc(Math.random() * numberCards)];

  rgbSyntaxEL.innerHTML = correctAnswer;
  displayCards(colors);
}

function displayCards(colorArr) {
  var colorCardsHTML = "";
  for (var i = 0; i < colorArr.length; i++) {
    colorCardsHTML += `<div class="color-card col-md-4">
      <div class="inner h-100 rounded" 
      style="background-color: ${colorArr[i]}">
      </div>     
    </div>
    `;
  }

  colorsContainerEl.innerHTML = `
  <div class="row g-4 py-4 justify-content-between ">
  ${colorCardsHTML}
  </div>
  `;

  var allCards = document.querySelectorAll(".color-card .inner");
  for (var i = 0; i < allCards.length; i++) {
    allCards[i].onclick = checkAnswer;
  }
}

function checkAnswer(event) {
  if (event.target.style.backgroundColor === correctAnswer) {
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Congratulation 🎉",
      showConfirmButton: false,
      timer: 1500,
    });
    askQuestion(selectedLevel);
  } else {
    event.target.style.display = "none";
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "try again !",
    });
  }
}

askQuestion(selectedLevel);

//EVENTS
hardBtnEl.onclick = function () {
  selectedLevel = "hard";
  askQuestion(selectedLevel);
  easyBtnEl.classList.remove("active");
  hardBtnEl.classList.add("active");
};
easyBtnEl.onclick = function () {
  selectedLevel = "easy";
  askQuestion(selectedLevel);
  easyBtnEl.classList.add("active");
  hardBtnEl.classList.remove("active");
};

getColorsBtnEl.onclick = function () {
  askQuestion(selectedLevel);
};
