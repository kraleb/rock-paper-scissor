const options = ["Rock", "Paper", "Scissor"];

function computerPlay() {
  let randomSelection = Math.floor(Math.random() * options.length);
  let currentOption = options[randomSelection];
  return currentOption;
}

function play(
  playerSelection = window.prompt(),
  computerSelection = computerPlay()
) {
  let response;
  let status = null;
  if (!playerSelection) {
    return "Nothing";
  }
  let playerSelectionLow = playerSelection.toLowerCase();
  playerSelection = capitalize(playerSelection);

  if (playerSelectionLow == computerSelection.toLowerCase()) {
    status = 0;
  } else if (playerSelectionLow == "rock") {
    if (computerSelection == "Scissor") {
      status = 1;
    }
    if (computerSelection == "Paper") {
      status = -1;
    }
    status = computerSelection == "Scissor" ? 1 : -1;
  } else if (playerSelectionLow == "paper") {
    if (computerSelection == "Rock") {
      status = 1;
    }
    if (computerSelection == "Scissor") {
      status = -1;
    }
  } else if (playerSelectionLow == "scissor") {
    if (computerSelection == "Paper") {
      status = 1;
    }
    if (computerSelection == "Rock") {
      status = -1;
    }
  }

  switch (status) {
    case 1:
      response = `You Win! ${playerSelection} beats ${computerSelection}`;
      break;
    case -1:
      response = `You Lose! ${playerSelection} loses to ${computerSelection}`;
      break;
    case 0:
      response = `You Tie! you both chose ${playerSelection}, try again`;
      break;
    default:
      response = `Enter a supported value! Select from ${options.join(", ")}`;
  }
  console.log(response);
  return status;
}

function game(matches = 5) {
  let tracker = { wins: 0, ties: 0, loses: 0 };
  let outcomeTrack = 0;
  let outcome;
  let response;

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

function capitalize(string) {
  let firstCap = string.charAt(0).toUpperCase();
  let rest = string.slice(1, string.length).toLowerCase();
  return firstCap + rest;
}
