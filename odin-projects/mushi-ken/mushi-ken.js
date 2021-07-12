const frog = 'Frog';
const slug = 'Slug';
const snake = 'Snake';
const frogArray = [frog, slug, snake];

let score = [0, 0]; // you, comp
let successfullGames = 0;

const frogCard = document.getElementById('frog-card');
const slugCard = document.getElementById('slug-card');
const snakeCard = document.getElementById('snake-card');
const cardArray = [frogCard, slugCard, snakeCard];

const textDisplay = document.getElementById('score-text');
const scoreDisplay = document.getElementById('score');

function computerPlay() {
    let rand = Math.floor(Math.random() * 2.9999999999);
    return frogArray[rand];
}


function playRound(playerSelection, computerSelection) {

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

        //keeps score and resets
function game(playerSelection, computerSelection) {

    if (successfullGames == 5 && score[0] > score[1]) {
        textDisplay.innerHTML = computerSelection + " beats " + playerSelection + ", you lose the game. Commiserations.";
        score = [0, 0];
        successfullGames = 0;
    } else if (successfullGames == 5 && score[0] < score[1]) {
        textDisplay.innerHTML = playerSelection + " beats " + computerSelection + ", you win the game! Congratulations!";
        score = [0, 0];
        successfullGames = 0;
    }
}

        //deflashes the two cards not selected by the computer
function flashCard(card) {
    card.classList.add('comp-selected');
    let cardNo = cardArray.indexOf(card);
    cardArray.forEach(cardInArray => {
        if (cardInArray != card) {
            cardInArray.classList.add('comp-notselected')
        }
    });
    let id = null;
    let flash = 0;
    clearInterval(id);
    id = setInterval (frame, 200);
    function frame() {
        if (flash == 1) {
            card.classList.remove('comp-selected');
            cardArray.forEach(cardInArray => {
                if (cardInArray != card) {
                    cardInArray.classList.remove('comp-notselected')
                }
            });
            clearInterval(id);
        } else {
            flash++;
        }
    }
}
        // chooses the comp's card and assigns yours from the DOM
function roundChoice(e) {

    let computerChoice = computerPlay();
    let card = cardArray[frogArray.indexOf(computerChoice)];
    flashCard(card);
    
    let playerChoice = frogArray[cardArray.indexOf(e.target)]
    textDisplay.innerHTML = playRound(playerChoice, computerChoice);
    scoreDisplay.innerHTML = score[0] + ' - ' + score[1];
    game(playerChoice, computerChoice);
    
}


frogCard.addEventListener('click', roundChoice);
slugCard.addEventListener('click', roundChoice);
snakeCard.addEventListener('click', roundChoice);