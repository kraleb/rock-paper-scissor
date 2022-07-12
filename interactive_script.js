// SETUP
const rockButton = document.querySelector("#rock_button");
const paperButton = document.querySelector("#paper_button");
const scissorButton = document.querySelector("#scissor_button");
const resultBox = document.querySelector("#result_box");
const gameBox = document.querySelector("#game_box");
const winBox = document.querySelector("#win");
const loseBox = document.querySelector("#lose");
const options = ["Rock", "Paper", "Scissor"];

let tracker = { win: 0, tie: 0, lose: 0 };

// LISTENERS
rockButton.addEventListener("click", (e) => {
  play(e.target.value);
});

paperButton.addEventListener("click", (e) => {
  play(e.target.value);
});

scissorButton.addEventListener("click", (e) => {
  play(e.target.value);
});

// LOGIC
function computerPlay() {
  let randomSelection = Math.floor(Math.random() * options.length);
  let currentOption = options[randomSelection];
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

  if (["win", "lose"].includes(status) && tracker[status] == 5) {
    gameBox.textContent = "GAME OVER";
    document
      .querySelector(`#${status}`)
      .setAttribute("style", "border: 1px solid crimson;");
    tracker = { win: 0, tie: 0, lose: 0 };
  } else if (gameBox.textContent) {
    gameBox.innerHTML = null;
  }
}

/**
function game(matches = 5) {
  let tracker = { wins: 0, ties: 0, loses: 0 };
  let outcomeTrack = 0;
  let outcome;

  for (let i = 1; i <= matches; i++) {
    outcome = play();
    outcomeTrack += outcome;
    if (outcome == 1) {
      tracker.wins += 1;
    } else if (outcome == -1) {
      tracker.loses += 1;
    } else if (outcome == 0) {
      tracker.ties += 1;
    } else if (outcome == "Nothing") {
      console.log("Nothing entered, skipping this match");
    } else {
      // if we don't get a valid value, do not increase the match count
      i--;
    }
  }

  return handleGameResponse(outcomeTrack, tracker);
}

function handleGameResponse(outcomeTotal, tracker) {
  if (outcomeTotal > 0) {
    response = "You WON the game!";
  } else if (outcomeTotal < 0) {
    response = "You LOST the game!";
  } else {
    response = "You TIED the game!";
  }
  response += ` Wins: ${tracker.wins}, Ties: ${tracker.ties}, Loses: ${tracker.loses}`;
  return response;
}
*/

// SUPPORT

function capitalize(stringIn) {
  let firstCap = stringIn.charAt(0).toUpperCase();
  let rest = stringIn.slice(1, stringIn.length).toLowerCase();
  return firstCap + rest;
}
