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

  const extra_letters_to_add = 3;

  all_letters = target_word.split('');

  while (all_letters.length < 8) {
    let letter = extra_letter_array.shift();
    if (!target_word.includes(letter)) {
      all_letters.push(letter);
    }
  }
}
setUp();

console.log(all_letters)

// const keyboard_container = document.querySelector('#keyboard');
//
// const keyboard_keys = 'qwertyuiopasdfghjkl>zxcvbnm<'

const banner = document.querySelector('#banner');
const banner_message = document.querySelector('#message');
const banner_goes = document.querySelector('#goes');

const dom = {
  next_letter: document.querySelector('#next-letter')
}

const tiles_container = document.querySelector('#tiles')

let rows = []

const dropLetter = (letter, column) => {
  let i = 0;
  // console.log(rows[i].children[column].innerHTML !== '', rows[i].children[column].innerHTML)

  // while (i < 6 && rows[i].children[column].innerHTML === '') {
  // while (i < 0 && rows[i].children[column].innerHTML === '') {
  //   let ii = i;
  //   setTimeout(()=>{
  //     if (ii === 5 || rows[ii].children[column].innerHTML !== '') {
  //       console.log('end of row?')
  //     }
  //     console.log(ii)
  //     rows[ii].children[column].innerHTML = letter;
  //     if (ii > 0) {
  //       rows[ii-1].children[column].innerHTML = '';
  //     }
  //
  //   },i*200)
  //   i++;
  // }

  const triggerRowEnd = (row) => {

    // console.log('row end?', row, rows[row].children[column],letter, target_word_array[column])
    if (letter === target_word_array[column]) {
      rows[row].children[column].classList.add('right-position');
    } else if (target_word.includes(letter)) {
      rows[row].children[column].classList.add('wrong-position');
    } else {
      rows[row].children[column].classList.add('wrong-letter');

      all_letters.splice(all_letters.indexOf(last_letter), 1)
      console.log(all_letters)
    }
    // rows[row];


    if (Array.from(rows[row].children).every((child)=>{
      return child.classList.contains('right-position')
    })) {
      gameWon();
    } else if (goes === 30) {
      gameLost();
    }
  }

  const checkAndDrop = () => {
    if (i < 6 && rows[i].children[column].innerHTML === '') {
      rows[i].children[column].innerHTML = letter;
      if (i > 0) {
        rows[i-1].children[column].innerHTML = '';
      }
    } else {
      triggerRowEnd(i-1);
      clearInterval(timed_loop);
    }
    i++;
  }
  checkAndDrop();
  let timed_loop = setInterval(checkAndDrop,150);
}

const selectColumn = (column) => {
  // console.log(column)
  dropLetter(next_letter, column)
  updateNextLetter();
  goes++;
}

for (let i = 0; i < 6; i++) {
  let row = document.createElement('div');
  row.classList.add('row')
  tiles_container.appendChild(row)
  rows.push(row)

  for (let j = 0; j < 5; j++) {
    let space = document.createElement('span');
    space.classList.add('space')
    row.appendChild(space)
    space.addEventListener('click', ()=>{selectColumn(j)})
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
    // next_letter = target_word_array[Math.floor(Math.random()*5)];
    next_letter = all_letters[Math.floor(Math.random()*all_letters.length)];
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
  banner.classList.remove('hidden')
  banner_message.innerHTML = 'WIN!';
  // banner_goes.innerHTML = (guess) + ' guess' + (guess > 2 ? 'es' : '');
}

const gameLost = () => {
  console.log('you lose...')
  banner.classList.remove('hidden')
  banner_message.innerHTML = 'LOSE...';
  // banner_goes.innerHTML = (guess-1) + ' guess' + (guess > 2 ? 'es' : '');
}




let guess = 1;
let tile = 1;

const replayGame = () => {
  target_word = valid_answers[Math.floor(Math.random()*valid_answers.length)]
  guess = 1;
  tile = 1;
  current_guess = '';
  banner.classList.add('hidden');
  rows.forEach(row=>{
    for (let i = 0; i < 5; i++) {
      row.children[i].classList.remove('right-position')
      row.children[i].classList.remove('wrong-position')
      row.children[i].innerHTML = '';
    }
    row.classList.remove('submitted');
  })
  document.querySelectorAll('.key').forEach(key=>{
    key.classList.remove('key-in-word');
  })
  console.log(target_word)
}

const resetGame = () => {
  setUp();
  // clearInterval(timed_loop);
  document.querySelectorAll('#tiles .space').forEach(space => {
    space.innerHTML = '';
    space.classList.remove('right-position')
    space.classList.remove('wrong-position')
    space.classList.remove('wrong-letter')
  })

  goes = 0;
}

const replay_button = document.querySelector('#reset')

replay_button.addEventListener('click',()=>{
  // location.reload()
  // replayGame();
  resetGame();
})
