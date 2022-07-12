// SETUP
const rockButton = document.querySelector("#rock_button");
const paperButton = document.querySelector("#paper_button");
const scissorButton = document.querySelector("#scissor_button");
const resultBox = document.querySelector("#result_box");
const gameBox = document.querySelector("#game_box");
const winBox = document.querySelector("#win");
const loseBox = document.querySelector("#lose");
const computerOptions = ["Rock", "Paper", "Scissor"];
const randomChars = Array.from(Array(15).keys()).map((entry) => {
  return entry + 33;
});

let tracker = { win: 0, tie: 0, lose: 0 };

// LISTENERS
[rockButton, paperButton, scissorButton].forEach((btn) =>
  btn.addEventListener("click", (e) => {
    play(e.target.value);
  })
);

// LOGIC
function computerPlay() {
  let currentOption =
    computerOptions[Math.floor(Math.random() * computerOptions.length)];
  return currentOption;
}

function play(playerSelection, computerSelection = computerPlay()) {
  let response = "You tied!";
  let status = "tie";
  let playerSelectionLow = playerSelection.toLowerCase();

  playerSelection = capitalize(playerSelection);
  if (playerSelectionLow != computerSelection.toLowerCase()) {
    if (playerSelectionLow == "rock") {
      status = computerSelection == "Scissor" ? "win" : "lose";
    } else if (playerSelectionLow == "paper") {
      status = computerSelection == "Rock" ? "win" : "lose";
    } else if (playerSelectionLow == "scissor") {
      status = computerSelection == "Paper" ? "win" : "lose";
    }
    response = `You ${status}! ${playerSelection} beats ${computerSelection}`;
  }

  updateResult(response, status);
  return status;
}

function updateResult(response, status) {
  tracker[status]++;
  resultBox.textContent = response;
  winBox.textContent = tracker["win"];
  loseBox.textContent = tracker["lose"];
  if (handleGameEnd(tracker, status)) {
    tracker = { win: 0, tie: 0, lose: 0 };
  }
}

// SUPPORT

function handleGameEnd(tracker, status) {
  if (["win", "lose"].includes(status) && tracker[status] == 5) {
    gameBox.textContent = "GAME OVER";
    document
      .querySelector(`#${status}`)
      .setAttribute("style", "border: 1px solid crimson; color: crimson;");
    return 1;
  } else if (gameBox.textContent) {
    gameBox.innerHTML = null;
    document.querySelectorAll(".counter").forEach((counter) => {
      counter.style = "";
    });
    document.querySelectorAll(".bookend-container").forEach((container) =>
      Array.from(container.childNodes)
        .filter((node) => node.nodeName == "#text")
        .forEach((textNode) => textNode.remove())
    );
  } else {
    generateRandomCharInBookend();
  }
  return 0;
}

function generateRandomCharInBookend() {
  let charRand = randomChars[Math.floor(randomChars.length * Math.random())];
  let char = ` ${String.fromCharCode(charRand)} `;
  document.querySelectorAll(".bookend-item").forEach((el) => {
    el.insertAdjacentText("beforebegin", char);
    el.insertAdjacentText("afterend", char);
  });
}

function capitalize(stringIn) {
  let firstCap = stringIn.charAt(0).toUpperCase();
  let rest = stringIn.slice(1, stringIn.length).toLowerCase();
  return firstCap + rest;
}
