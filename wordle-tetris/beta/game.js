
//holding drop and clearing row doesnt allow pause to take effect

// 1 wrong letter dropping after clear! more?

// from tetris
const level_speeds = [1,0.793,0.6178,0.4727,0.3551,0.262,0.1896,0.1348,0.0939,0.0642]
// maybe just change this to level timesing by 0.8?
                    //        0.779, 0.765, 0.7512

// do reply button


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

console.log(all_letters)

let letter_iterator = [];
let max_letters_without_new_line = 3;

const resetLetterIterator = () => {
  let array = target_word.split('');
  array.forEach(letter => {
    for (let i = 0; i < max_letters_without_new_line; i++) {
      letter_iterator.push(letter);
    }
  })
}

const shuffleLetterIterator = () => {
  for (let i = letter_iterator.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let k = letter_iterator[i]
    letter_iterator[i] = letter_iterator[j]
    letter_iterator[j] = k
  }
}

resetLetterIterator()


const banner = document.querySelector('#banner');
const banner_message = document.querySelector('#message');
const banner_goes = document.querySelector('#goes');

const dom = {
  next_letter: document.querySelector('#next-letter'),
  score: document.querySelector('#score')
}

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
    // space.addEventListener('click', ()=>{selectColumn(j)})
  }

}

const tiles = document.querySelectorAll('.space');

console.log(dom.next_letter)


let next_letter;
let last_letter;

const updateNextLetter = () => {

  let current_letter = next_letter;
  last_letter = next_letter;
  do {
    // next_letter = all_letters[Math.floor(Math.random()*all_letters.length)];
    if (letter_iterator.length === 0) {
      resetLetterIterator();
    }
    shuffleLetterIterator();
    next_letter = letter_iterator.pop();
  } while (next_letter === current_letter);


  dom.next_letter.innerHTML = next_letter;

}

updateNextLetter();



const keyPress = (letter) => {
  // console.log(letter)

  if (tile < 6) {
    rows[guess-1].children[tile-1].innerHTML = letter;
    tile++;
    current_guess = current_guess.concat(letter)
  }

  // console.log(current_guess)
}

let current_guess = '';

const gameWon = () => {
  console.log('you win!')
  banner_message.innerHTML = '<div>YOU</div><div>WIN!</div>';
  setTimeout(()=>{banner.classList.remove('hidden');},1500)
  rows[row-1].classList.add('winning-row');
  let target_row = rows[row-1];
  // setTimeout(()=>{target_row.classList.remove('winning-row');},1000)
  setTimeout(()=>{target_row.classList.add('with-delay');},600)
  // setTimeout(()=>{target_row.classList.add('winning-row');},1001)
  game_over = true;
  // banner_goes.innerHTML = (guess) + ' guess' + (guess > 2 ? 'es' : '');
  clearInterval(gamePlayLoop)
}

const gameLost = () => {
  console.log('you lose...')
  banner.classList.remove('hidden')
  banner_message.innerHTML = '<div>GAME</div><div>OVER</div>';
  // banner_goes.innerHTML = (guess-1) + ' guess' + (guess > 2 ? 'es' : '');
  game_over = true;
  clearInterval(gamePlayLoop)
}


let guess = 1;
let tile = 1;


const resetGame = () => {
  setUp();
  updateNextLetter();
  // clearInterval(timed_loop);
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

  gamePlayLoop = setInterval(gamePlay, speed*100);
}

const replay_button = document.querySelector('#reset')

replay_button.addEventListener('click',()=>{
  // location.reload()
  // replayGame();
  resetGame();
})



// buttons

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
  console.log('D')
  if (game_over) {
    return;
  }


  // console.log('drop letter')
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
  console.log('fast mode off')
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

  console.log('touch drop!')
  if (letter_in_play) {
    downTrigger();
    mobile_drop_triggered = true;
  }

}

tiles_container.addEventListener('click', touchDrop);



// button gameplay

let letter, column, row;
let pre_column = 2;
// let speed = 5;

let level = 0;
let speed = 10;
const setSpeed = () => {
  speed = level_speeds[level]*10;
}

let game_over = false;
let letter_in_play = false;


let used_words = [];

const setNewWord = () => {
  used_words.push(target_word)
  target_word = valid_answers[Math.floor(Math.random()*valid_answers.length)]
  target_word_array = target_word.split('');
}

const removeLetterClasses = (dom) => {
  dom.classList.remove('right-position')
  dom.classList.remove('wrong-position')
  dom.classList.remove('wrong-letter')
}

const reanalyseClasses = () => {

  tiles.forEach(node=>{
    let i = Array.from(tiles).indexOf(node)
    let col = i % 6
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
  // pause();
  clearInterval(gamePlayLoop)
  let rows_to_clear = 6 - r;
  let delay = 500;
  let board_2d_array = [];
  for (let j = 0; j < 6 - rows_to_clear; j++) {
    let temp_array = []
    Array.from(rows[r - j - 1].children).forEach(box=>{
      // box.innerHTML = rows[r - j - 1].children[rows[r-j].children.indexOf(box)]
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
      // for each cleared row (going down), set a timeout for each row (going up) to copy the row above it
      iter++;
    })


    setTimeout(()=>{
      for (let j = 0; j < 6 - rows_to_clear; j++) {
        // let rr = 5 - j - rows_to_clear
        // rows[rr]
        let box_it = 0;
        Array.from(rows[r - j + i].children).forEach(box=>{
          removeLetterClasses(rows[r-j+i].children[box_it])
          box.innerHTML = board_2d_array[r-j-1][box_it].letter
          if (board_2d_array[r-j-1][box_it].class.length > 1) {
            box.classList.add(board_2d_array[r-j-1][box_it].class[1])
          }
          box_it++;
        })


        // board_2d_array.push(temp_array);

      }
    },1000 + (rows_to_clear*500) + (i*200))
    // console.log(board_2d_array)
    // rows[r + i]
  }
  setTimeout(reanalyseClasses,1000 + (rows_to_clear*500) + (rows_to_clear*200))
  setTimeout(resume,1000 + (rows_to_clear*500) + (rows_to_clear*200) + 500)
  // for (let i = r-1; i > 0; i--) {
  //   let row_array = [];
  //   let it = 0;
  //   Array.from(rows[i].children).forEach(box=>{
  //     row_array.push(box.innerHTML)
  //     rows[i+1].children[it].innerHTML = box.innerHTMLdd
  //     it++;
  //   })
  // }
  // setTimeout(resume,daelay+(rows_to_clear*500));

}

const increaseLevel = () => {
  console.log('increase LVL:', level, '>',level+1)
  level++;

}

const triggerRowEnd = (row) => {

  if (letter === target_word_array[column]) {
    rows[row].children[column].classList.add('right-position');
  } else if (target_word.includes(letter)) {
    rows[row].children[column].classList.add('wrong-position');
  } else {
    rows[row].children[column].classList.add('wrong-letter');

    all_letters.splice(all_letters.indexOf(last_letter), 1)
    console.log(all_letters)
  }

  if (mobile_drop_triggered) {
    untriggerDrop();
    mobile_drop_triggered = false;
  }

  if (Array.from(rows[row].children).every((child)=>{
    return child.classList.contains('right-position')
  })) {
    // game_over = true;
    // gameWon();

    clearRow(row);
    setNewWord();
    resetLetterIterator()
    increaseLevel();
    setSpeed();
  // } else if (goes === 30) {
  //   gameLost();
  }
}

const resetPreColumn = () => {
  rows[0].children[pre_column].classList.remove('pre-row');
  pre_column = 2;
  // rows[0].children[pre_column].classList.add('pre-row');
}

const checkAndDrop = (column) => {

  row++;
  // console.log(row, column)
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
    // clearInterval(timed_loop);

    letter_in_play = false;
    row = -1;
  }
  // i++;
  // row++;
}

const changeColumn = (col) => {
  if (game_over) {
    return;
  }
  // console.log(column, col)
  // let target_empty = rows[row].children[col].innerHTML === '' ? true : false;

  // if (col >= 0 && col < 5 && target_empty) {
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
  // console.log('loop')
  if (!letter_in_play) {
    // selectColumn(2);
    letter = next_letter;
    // column = 2;
    column = pre_column;
    row = -1;
    // dropLetter(next_letter, column)
    checkAndDrop(column);
    letter_in_play = true;
    updateNextLetter();
    if (pre_column !== 2) {resetPreColumn();}
  } else {
    checkAndDrop(column);

  }
   // drops a letter
}

const pause = () => {
  clearInterval(gamePlayLoop)
}

const resume = () => {
  gamePlayLoop = setInterval(gamePlay, speed*100);
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
