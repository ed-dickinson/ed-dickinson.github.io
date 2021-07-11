const frog = 'Frog';
const slug = 'Slug';
const snake = 'Snake';
const frogArray = [frog, slug, snake];
let score = [0, 0]; // you, comp
let successfullGames = 0;

function computerPlay() {
    let rand = Math.floor(Math.random() * 2.9999999999);
    return frogArray[rand];
}

function playRound(playerSelection, computerSelection) {
//    prompt();
    playerSelection = playerSelection.substr(0,1).toUpperCase() + playerSelection.substr(1).toLowerCase();
    if (playerSelection == computerSelection) {
        return "You both chose " + computerSelection+ ", it's a tie.";
    } else if (playerSelection == 'Frog' && computerSelection == 'Slug' ||
            playerSelection == 'Slug' && computerSelection == 'Snake' ||
            playerSelection == 'Snake' && computerSelection == 'Frog') {
        score[0]++;
        successfullGames++;
        return playerSelection + " beats " + computerSelection + ", you win this round!";
    } else {
        score[1]++;
        successfullGames++;
        return computerSelection + " beats " + playerSelection + ", you lose this round.";
    }
};

function game() {
    while (successfullGames < 5) {
        let playerSelection = prompt("Frog, Slug, or Snake?");
        let computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection));
    }
    if (score[0] > score[1]) {
        console.log("You lose. Commiserations.");
    } else {
        console.log("You win! Congratulations!");
    }
}



game(); 