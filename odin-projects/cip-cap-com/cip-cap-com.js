// let gameBoard =
// Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

// okay rewrite with objects

//positions: 0 1 2
//           3 4 5
//           6 7 8


const counterSpaces = document.querySelectorAll('.counter');
const selectSquares = document.querySelectorAll('.squares');
const selectSquareArray = Array.from(selectSquares);
const coinStack = document.querySelector('.coin-stack');
const sickleStack = document.querySelector('.sickle-stack');
const logicSpaceArray = [];
const logicCounterArray = [];

const winStates = [[0,1,2],[3,4,5],[6,7,8],
                   [0,3,6],[1,4,7],[2,5,8],
                   [0,4,8],[6,4,2]];

const testbox = document.querySelector('.testbox');

const coins = document.querySelectorAll('.counter.coin');
const sickles = document.querySelectorAll('.counter.sickle');
let turnCounter = 1;
let userTurnCounter = 1;
let compTurnCounter = 1;
let lastUserMove = null;

const winMessageCont = document.querySelector('.win-message-container');
const winMessage = document.querySelector('.win-message');


const Player = (name, side) => {
  let chosenSquares = [];
  let turn = 1;
  const winPhrase = () => {
    return 'Go ' + side + '! ' + (side == 'Capitalism' ? "The commies didn't stand a chance." : 'Down with those capitalist pigs.');
  };
  const win = () => {
    // console.log(name + ' wins!');
    winMessage.children[0].innerHTML = name=='Human' ? 'YOU WIN!' : name.toUpperCase() + ' WINS!';
    winMessage.children[0].style.fontSize = name=='Computer' ? '3em' : '5em';
    winMessage.children[0].style.paddingTop = name=='Computer' ? '1em' : '0em';
    winMessage.children[1].innerHTML = turn > computer.getTurn()+1 ? 'Even if you did cheat...' : winPhrase();
    // console.log(turn + ' / ' + computer.getTurn());

    animateWinMessage();
  };
  const draw = () => {
    winMessage.children[0].innerHTML = "It's a draw.";
    winMessage.children[0].style.fontSize = '3em';
    winMessage.children[0].style.paddingTop = '1em';
    winMessage.children[1].innerHTML = 'Loggerheads prevail.';

    animateWinMessage();
  };
  const move = () => {
    let chosenSquare = name == "Human" ? selectSquareArray.indexOf(event.target) :
        computerLogic();
    // console.log(chosenSquare);
    let currentCounter = side == 'Capitalism' ? coinObjects[turn-1] : sickleObjects[turn-1];
    let won = false;
    currentCounter.animate(squareObjects[chosenSquare].xy);
    chosenSquares.push(chosenSquare);
    squareObjects[chosenSquare].taken = true;
    turn++;
    winStates.forEach(winState => {
      if (chosenSquares.includes(winState[0]) &&
          chosenSquares.includes(winState[1]) &&
          chosenSquares.includes(winState[2])) {
        win();
        //if human turn > compturn+2 display you cheating bastard! message
        won = true;
      }
    });
    if (won == false && turn > 5) {
      draw();
    }
    if (name == 'Human' && won == false) {
      window.setTimeout(function() {computer.move()}, 500);
    }
      // win();
  };
  const updateSquares = x => {
    squares.push(x);

  };
  const reset = () => {
    for (let i = 0; i < turn; i++) { // put counters back
      let currentCounter = side == 'Capitalism' ? coinObjects[turn-1-i] : sickleObjects[turn-1-i]; // IS THERE AN ISSUE HERE?

      let delay = i * 200;
      window.setTimeout(function() {
        currentCounter.animate(currentCounter.pileXY, true);
      }, delay);

    }
    chosenSquares = [];
    turn = 1;
  };
  const switchSides = () => {
    side == 'Communism' ? side = 'Capitalism' : side = 'Communism';
    // console.log(name + ': ' + side);
  };
  // const getName = () => name;
  // const getSide = () => side;
  const getTurn = () => turn;

  // const samename = name;
  return {winPhrase, move, turn, getTurn, reset, switchSides}
};

let computer = Player('Computer', 'Communism');
let human = Player('Human', 'Capitalism');


const Counter = (type, numberFromTop) => {
  const pilePosition = {x: type == 'Coin' ? -6 : 18, y: 5 + numberFromTop};
  const pileXY = [pilePosition.x, pilePosition.y];
  let currentXY = pileXY;

  const avatar = type == 'Coin' ? coins[5-numberFromTop] : sickles[5-numberFromTop];
  const animate = (newXY, reset) => {
    // if (reset) {
    //   avatar.style.zIndex = numberFromTop;
    //   console.log(avatar.style.zIndex);
    // };
    animateCounter(avatar, currentXY, newXY, false);
    avatar.style.zIndex = reset ? 5 - numberFromTop : numberFromTop + 2;
    currentXY = newXY;
  };

  return {pileXY, avatar, animate};

};

const Space = (number) => {
  //1 6 11
  const boardPosition = {
    x: number == 0 || number == 3 || number == 6 ? 1 :
        number == 1 || number == 4 || number == 7 ? 6 : 11,
    y: number < 3 ? 1 : number < 6 ? 6 : 11
    // x: selectSquares[number].style.left, y: selectSquares[number].style.top
    };
  const squareXY = [boardPosition.x, boardPosition.y];
  const xy = [boardPosition.x, boardPosition.y];

  let taken = false;
  const take = () => {
    taken = true;
  };

  return {boardPosition, squareXY, xy, take, taken, number};
}

const coinObjects = [];
const sickleObjects = [];

for (i = 1; i <= 5; i++) {
  coinObjects.push(Counter('Coin', i));
  sickleObjects.push(Counter('Sickle', i));
}


function animateWinMessage() {
  let id = null;
  let timer = 0;
  let length = 25;
  winMessageCont.style.display = 'block';

  clearInterval(id);
  id = setInterval(frame, 20);

  function frame() {
    if (timer == length+1) {
      clearInterval(id);
    } else {
      winMessageCont.style.opacity = timer / 20;
      winMessage.style.left = (timer * 4) - 50 + '%';// -50 > 50
      timer++;
    }
  }
}


function animateCounter(counter, start, end, intro) {
  let id = null;
  let timer = 0;
  let length = 20;

  let progress = 0;
  let moveX = end[0] - start[0];
  let moveY = end[1] - start[1];
  let modifier = 0.2; modifier = 0;

  clearInterval(id);
  id = setInterval(frame, 20);

  function frame() {
    if (timer == length+1) {
      clearInterval(id);
    } else if (intro) {
      progress = timer / length;
      counter.style.top = start[1] + (moveY * progress) + 'em';
      counter.style.left = start[0] + (moveX * progress) + 'em';
      timer++;
    } else {
      progress = timer / length;
      counter.style.top = start[1] + (moveY * progress) -
        (timer <= (length/2) ?
          (((       timer)) * (modifier)) :
          (((length)-timer) * (modifier)) ) +
        'em';
      counter.style.left = start[0] + (moveX * progress) + 'em';
      timer++;
    }
  }
}


function loadCounters(counters) {
  let homeY = 18;
  if (counters == coins) {
    homeY = -6;
  };
  let type = counters == coins ? 'coin' : 'sickle';
  let iterate = 0;
  let cntrIterator = 0;
  counters.forEach(counter => {
    animateCounter(counter, [homeY,(-10 - iterate*12)], [homeY,10-iterate], true);
    counter.style.zIndex = iterate;
    iterate++;
    cntrIterator++;
  });
}

loadCounters(coins);
loadCounters(sickles);


function randomMoveChooser(array) {
  return array[Math.floor((Math.random() * array.length) )];
}


function computerLogic() {
  let emptySquares = checkEmptySquares();
  // let emptySquareArray = [];
  // emptySquares.forEach(square => {emptySquareArray.push(square.number)});
  // console.log(emptySquareArray);

  let move = squareObjects.indexOf(randomMoveChooser(emptySquares));

  return move;

}

function checkEmptySquares() {
  let emptySquares = [];

  squareObjects.forEach(square => {
    if (square.taken == false) {
      emptySquares.push(square);
    };
  })

  return emptySquares;
}


let squareObjects = [];
selectSquares.forEach(square => {
  square.addEventListener('click', human.move);
  squareObjects.push(Space(squareObjects.length)); // using length bypasses iterator
});


function reset() {
  // console.log('reset');
  winMessageCont.style.display = 'none';
  winMessageCont.style.opacity = 0;
  human.reset();
  computer.reset();
  squareObjects.forEach(square => {
    square.taken = false;
  });
}


function sideSwitch() {
  // console.log('switched sides');
  let chosen = document.querySelector('.chosen-side');
  let unchosen = document.querySelector('.unchosen-side');
  chosen.classList.remove('chosen-side');
  unchosen.classList.remove('unchosen-side');
  chosen.classList.add('unchosen-side');
  unchosen.classList.add('chosen-side');

  reset();
  computer.switchSides();
  human.switchSides();

}

document.querySelector('.side-chooser').addEventListener('click', sideSwitch);

document.querySelector('.replay-win-message').addEventListener('click', reset);
