let $root = document.querySelector("#root");

let score;
let targetScore;
let wins = 0;
let losses = 0;

let makeGuess = function() {
  let $score = document.querySelector("#root p");
  $score.textContent = "Score: " + score + "  " + "Target: " + targetScore;

  if (score > targetScore) {
    alert("You lost this round!");
    losses++;
    $("#losses").text(losses);
    playRound();
  } else if (score === targetScore) {
    alert("You won this round!");
    wins++;
    $("#wins").text(wins);
    playRound();
  }

};

let Crystal = function(color) {
  this.element = document.createElement("div");
  this.element.className = "crystal " + color;
  this.value = 0;

  this.element.addEventListener(
    "click",
    function() {
      score += this.value;
      makeGuess();
    }.bind(this),
    false
  );
};

Crystal.prototype.render = function(target) {
  this.value = Math.floor(Math.random() * 15) + 1;
  target.appendChild(this.element);
};

let crystals = [new Crystal("red"), new Crystal("blue"), new Crystal("green")];

let playRound = function() {
  let fragment = document.createDocumentFragment();
  let $score = document.createElement("p");
  targetScore = Math.floor(Math.random() * 50) + 25;
  score = 0;
  $score.textContent = "Score: " + score + "  " + "Target: " + targetScore;
  crystals
    .sort(function() {
      return 0.5 - Math.random();
    })
    .forEach(function(crystal) {
      crystal.render(fragment);
    });
  fragment.appendChild($score);
  $root.innerHTML = "";
  $root.appendChild(fragment);
};

playRound();
