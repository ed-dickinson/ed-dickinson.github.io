let target_word, target_word_array, all_letters;

let goes = 0;

const setUp = () => {
  target_word = valid_answers[Math.floor(Math.random()*valid_answers.length)]
  console.log(target_word)
  target_word_array = target_word.split('');

  let common_extra_letters = 'ear';
  let less_common_extra_letters = 'otlis';
  let extra_letter_array = common_extra_letters.split('');
  less_common_extra_letters.split('').forEach(letter => {
    extra_letter_array.push(letter);
  })

  let extra_letters_to_add = 3;
  extra_letters_to_add = 0;

  // get rid of this bit?
  all_letters = target_word.split('');
  if (extra_letters_to_add > 0) {
    while (all_letters.length < target_word + extra_letters_to_add) {
      let letter = extra_letter_array.shift();
      if (!target_word.includes(letter)) {
        all_letters.push(letter);
      }
    }
  }

}
setUp();

// LETTER ITERATOR sets up an array of n copies of each letter to select from to ensure regular letter appearance

let letter_iterator = [];
let max_letters_without_new_line = 3;

const resetLetterIterator = () => {
  letter_iterator = [];
  let array = target_word.split('');
  array.forEach(letter => {
    for (let i = 0; i < max_letters_without_new_line; i++) {
      letter_iterator.push(letter);
    }
  })
  // console.log(letter_iterator)
}

const shuffleLetterIterator = () => {
  for (let i = letter_iterator.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let k = letter_iterator[i]
    letter_iterator[i] = letter_iterator[j]
    letter_iterator[j] = k
  }
  // console.log(letter_iterator)
}

resetLetterIterator()


const banner = document.querySelector('#banner');
const banner_message = document.querySelector('#message');
const banner_goes = document.querySelector('#goes');
const banner_result = document.querySelector('#result');

const dom = {
  next_letter: document.querySelector('#next-letter'),
  score: document.querySelector('#score')
}

dom.score.innerHTML = '';

// SETS UP MAIN GRID

const tiles_container = document.querySelector('#tiles')
let rows = []

for (let i = 0; i < 6; i++) {
  let row = document.createElement('div');
  row.classList.add('row')
  tiles_container.appendChild(row)
  rows.push(row)

  for (let j = 0; j < 5; j++) {
    let space = document.createElement('span');
    space.classList.add('space')
    row.appendChild(space)
  }
}

const tiles = document.querySelectorAll('.space');


let next_letter;
let last_letter;

const updateNextLetter = () => {

  let current_letter = next_letter;
  last_letter = next_letter;
  // do {
    // next_letter = all_letters[Math.floor(Math.random()*all_letters.length)];
    if (letter_iterator.length === 0) {
      resetLetterIterator();
    }
    shuffleLetterIterator();
    next_letter = letter_iterator.pop();
  // } while (next_letter === current_letter);

  dom.next_letter.innerHTML = next_letter;

}

updateNextLetter();



const keyPress = (letter) => {
  if (tile < 6) {
    rows[guess-1].children[tile-1].innerHTML = letter;
    tile++;
    current_guess = current_guess.concat(letter)
  }
}

let current_guess = '';

const gameWon = () => {
  console.log('you win!')
  banner_message.innerHTML = '<div>YOU</div><div>WIN!</div>';
  setTimeout(()=>{banner.classList.remove('hidden');},1500)
  rows[row-1].classList.add('winning-row');
  let target_row = rows[row-1];
  setTimeout(()=>{target_row.classList.add('with-delay');},600)
  game_over = true;
  clearInterval(gamePlayLoop)
}

const gameLost = () => {
  console.log('you lose...')
  banner.classList.remove('hidden')
  banner_message.innerHTML = '<div>GAME</div><div>OVER</div>';
  banner_result.innerHTML = `You got ${level} word${level===1?'':'s'}!`;
  game_over = true;
  clearInterval(gamePlayLoop)
}


let guess = 1;
let tile = 1;


const resetGame = () => {
  setUp();
  resetLetterIterator();
  updateNextLetter();
  document.querySelectorAll('#tiles .space').forEach(space => {
    space.innerHTML = '';
    space.classList.remove('right-position')
    space.classList.remove('wrong-position')
    space.classList.remove('wrong-letter')
  })
  document.querySelectorAll('#tiles .row').forEach(row => {
    row.classList.remove('winning-row')
  })

  banner.classList.add('hidden');

  game_over = false;
  letter_in_play = false;

  goes = 0;
  level = 0;
  setSpeed();

  dom.score.innerHTML = '';

  gamePlayLoop = setInterval(gamePlay, speed*100);
}

const replay_button = document.querySelector('#reset')

replay_button.addEventListener('click',()=>{
  resetGame();
})



// BUTTONS and THEIR FUNCTIONS

const animateButton = (dom) => {
  dom.classList.add('pressed');
  setTimeout(()=>{dom.classList.remove('pressed')},100)
}

const leftTrigger = () => {
  // console.log('L')
  letter_in_play ? changeColumn(column-1) : changePreColumn(pre_column-1);
  animateButton(left_button)
}
const rightTrigger = () => {
  // console.log('R')
  letter_in_play ? changeColumn(column+1) : changePreColumn(pre_column+1);
  animateButton(right_button)
}
const downTrigger = () => {
  // console.log('D')
  if (game_over || busy) {
    return;
  }

  if (!fast_drop_mode_on) {
    clearInterval(gamePlayLoop)
    gamePlay();
    gamePlayLoop = setInterval(gamePlay, speed*25) // double speed
    fast_drop_mode_on = true;
  }

  // animateButton(down_button)
}

let fast_drop_mode_on = false;

const left_button = document.querySelector('#left');
const right_button = document.querySelector('#right');

left_button.addEventListener('click', leftTrigger);
right_button.addEventListener('click', rightTrigger);

const keyboardPress = () => {
  if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
    leftTrigger();
  }
  else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
    rightTrigger();
  }
  else if (event.code === 'ArrowDown' || event.code === 'KeyS') {
    window.addEventListener('keyup', keyboardRelease);
    downTrigger();
  }
}
const untriggerDrop = () => {
  window.removeEventListener('keyup', keyboardRelease);
  clearInterval(gamePlayLoop)
  if (!game_over) {
    gamePlayLoop = setInterval(gamePlay, speed*100)
  }
  fast_drop_mode_on = false;
}
const keyboardRelease = () => {
  if (event.code === 'ArrowDown' || event.code === 'KeyS') {
    untriggerDrop();
  }
}
window.addEventListener('keydown', keyboardPress);

let mobile_drop_triggered = false;

const touchDrop = () => {
  if (letter_in_play) {
    downTrigger();
    mobile_drop_triggered = true;
  }
}

tiles_container.addEventListener('click', touchDrop);


// GAMEPLAY

let letter, column, row;
let pre_column = 2;

let level = 0;
let speed = 10;

const setSpeed = () => {
  if (level === 0) {
    speed = 10;
  } else {
    speed *= 0.8;
  }
  // speed = level_speeds[level]*10;
}

let game_over = false;
let letter_in_play = false;
let busy;

let used_words = [];

const setNewWord = () => {
  used_words.push(target_word)
  target_word = valid_answers[Math.floor(Math.random()*valid_answers.length)]
  target_word_array = target_word.split('');
  console.log(target_word)
}

const removeLetterClasses = (dom) => {
  dom.classList.remove('right-position')
  dom.classList.remove('wrong-position')
  dom.classList.remove('wrong-letter')
}

const reanalyseClasses = () => {
  tiles.forEach(node=>{
    let i = Array.from(tiles).indexOf(node)
    let col = i % 5
    node.classList.remove('right-position')
    node.classList.remove('wrong-position')
    node.classList.remove('wrong-letter')
    if (node.innerHTML !== '') {
      if (node.innerHTML === target_word_array[col]) {
        node.classList.add('right-position');
      } else if (target_word.includes(node.innerHTML)) {
        node.classList.add('wrong-position');
      } else {
        node.classList.add('wrong-letter');
      }
    }
  })
}

const clearRow = (r) => {
  console.log(r)

  rows[r].classList.add('cleared-row');
  let target_row = rows[r];
  setTimeout(()=>{target_row.classList.remove('cleared-row');},500)
  clearInterval(gamePlayLoop)
  busy = true;
  let rows_to_clear = 6 - r;
  let delay = 500; // sorts timing between clearing and dropping
  let board_2d_array = [];
  for (let j = 0; j < 6 - rows_to_clear; j++) {
    let temp_array = []
    Array.from(rows[r - j - 1].children).forEach(box=>{
      temp_array.push({letter: box.innerHTML, class: box.className.split(' ')})
      board_2d_array[r-j-1] = temp_array;
    })
  }

  for (let i = 0; i < rows_to_clear; i++) { // each row cleared = r + i
    let iter = 0;
    Array.from(rows[r + i].children).forEach(box=>{
      setTimeout(()=>{
        box.innerHTML = ''
        box.classList.remove('right-position')
        box.classList.remove('wrong-position')
        box.classList.remove('wrong-letter')
      },delay + (i*500) + (iter*100))

      iter++;
    })

    // for each cleared row (going down), set a timeout to copy the row above it
    setTimeout(()=>{
      for (let j = 0; j < 6 - rows_to_clear; j++) {

        // drops rows
        let box_it = 0;
        Array.from(rows[r - j + i].children).forEach(box=>{
          removeLetterClasses(rows[r-j+i].children[box_it])
          box.innerHTML = board_2d_array[r-j-1][box_it].letter
          if (board_2d_array[r-j-1][box_it].class.length > 1) {
            box.classList.add(board_2d_array[r-j-1][box_it].class[1])
          }
          box_it++;
        })

        // clears final row (top)
        Array.from(rows[0].children).forEach(box=>{
          removeLetterClasses(box)
          box.innerHTML = '';
        })
      }
    },delay + (rows_to_clear*500) + (i*200))
  }
  //sets timeout to rejig sqaure colours
  setTimeout(reanalyseClasses,delay + (rows_to_clear*500) + (rows_to_clear*200))
  setTimeout(updateNextLetter,delay + (rows_to_clear*500) + (rows_to_clear*200))
  setTimeout(resume,delay + (rows_to_clear*500) + (rows_to_clear*200) + 500)

}

const increaseLevel = () => {
  console.log('increase LVL:', level, '>',level+1)
  level++;
  dom.score.innerHTML = level;
}

const triggerRowEnd = (row) => {

  if (letter === target_word_array[column]) {
    rows[row].children[column].classList.add('right-position');
  } else if (target_word.includes(letter)) {
    rows[row].children[column].classList.add('wrong-position');
  } else {
    rows[row].children[column].classList.add('wrong-letter');
  }

  if (mobile_drop_triggered) {
    untriggerDrop();
    mobile_drop_triggered = false;
  }

  if (Array.from(rows[row].children).every((child)=>{
    return child.classList.contains('right-position')
  })) {
    clearRow(row);
    setNewWord();
    resetLetterIterator()
    increaseLevel();
    setSpeed();
  }
}

const resetPreColumn = () => {
  rows[0].children[pre_column].classList.remove('pre-row');
  pre_column = 2;
}

const checkAndDrop = (column) => {

  row++;

  if (row === 0 && rows[row].children[column].innerHTML !== '') {
    gameLost();
    return;
  }
  if (row < 6 && rows[row].children[column].innerHTML === '') {
    rows[row].children[column].innerHTML = letter;
    if (row > 0) {
      rows[row-1].children[column].innerHTML = '';
    }
  } else {
    triggerRowEnd(row-1);

    letter_in_play = false;
    row = -1;
  }
}

const changeColumn = (col) => {
  if (game_over) {
    return;
  }

  if (col >= 0 && col < 5 && rows[row].children[col].innerHTML === '') {
    rows[row].children[col].innerHTML = letter;
    rows[row].children[column].innerHTML = '';
    column = col;
  }
}

const changePreColumn = (col) => {
  if (game_over) {
    return;
  }
  if (col >= 0 && col < 5) {
    rows[0].children[col].classList.add('pre-row');
    rows[0].children[pre_column].classList.remove('pre-row');
    pre_column = col;
  }
}

const gamePlay = () => {

  if (!letter_in_play) {

    letter = next_letter;
    column = pre_column;
    row = -1;

    checkAndDrop(column);
    letter_in_play = true;
    updateNextLetter();
    if (pre_column !== 2) {resetPreColumn();}
  } else {
    checkAndDrop(column);
  }
}

const pause = () => {
  clearInterval(gamePlayLoop)
}

const resume = () => {
  gamePlayLoop = setInterval(gamePlay, speed*100);
  busy = false;
}


let intro_on = true;
intro_on = false;

let gamePlayLoop;

// account for intro delay
setTimeout(()=> {
  gamePlayLoop = setInterval(gamePlay, speed*100);
},intro_on ? 1800 : 0)

// if (!intro_on) {
//   title_holder.style.display = 'none'
// }

!intro_on ? title_holder.style.display = 'none' : ''

// disable double tap
document.addEventListener("click", event => {
  event.preventDefault()
  event.stopPropagation()
})
