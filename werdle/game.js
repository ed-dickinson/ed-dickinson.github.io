let target_word = valid_answers[Math.floor(Math.random()*valid_answers.length)]
console.log(target_word)

const keyboard_container = document.querySelector('#keyboard');

const keyboard_keys = 'qwertyuiopasdfghjkl>zxcvbnm<'

const banner = document.querySelector('#banner');
const banner_message = document.querySelector('#message');
const banner_goes = document.querySelector('#goes');

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
  banner_goes.innerHTML = (guess-1) + ' guess' + (guess > 2 ? 'es' : '');
}

const gameLost = () => {
  console.log('you lose...')
  banner.classList.remove('hidden')
  banner_message.innerHTML = 'LOSE...';
  banner_goes.innerHTML = (guess-1) + ' guess' + (guess > 2 ? 'es' : '');
}

const enterPress = () => {
  console.log('enter', tile)

  if (tile === 6) {
    let valid_guess = valid_guesses.indexOf(current_guess) !== -1 ? true : valid_answers.indexOf(current_guess) !== -1 ? true : false;
    // let valid_answer = valid_answers.indexOf(current_guess) !== -1 ? true : false;
    // valid_guesses.indexOf(current_guess)
    // console.log(valid_guess)

    if (valid_guess) {


      let guess_array = current_guess.split('')
      let target_word_array = target_word.split('')


      for (let i = 0; i < 5; i++) {
        if (target_word.includes(current_guess[i])) {


          let letter_position = target_word_array.indexOf(current_guess[i])
          // if (letter_position === i) {
          if (current_guess[i] === target_word[i]) {
            rows[guess-1].children[i].classList.add('right-position')
          } else {
            rows[guess-1].children[i].classList.add('wrong-position')
          }

        } else {
          // grey out keyboard
          document.querySelector('.letter-' + current_guess[i]).classList.add('key-in-word')
        }
      }


      rows[guess-1].classList.add('submitted');


      tile = 1;

      if (current_guess === target_word) {
        gameWon();
        return;
      } else if (guess > 5) {
        gameLost();
      }

      guess++;
      current_guess = '';

    }

  }
}

const backspacePress = () => {
  // console.log('backspace')

  if (tile > 1) {
    rows[guess-1].children[tile-2].innerHTML = '';
    tile--;
    current_guess = current_guess.slice(0,current_guess.length-1)
  }

  // console.log(current_guess)
}

for (let i = 0; i < keyboard_keys.length; i++) {
  let key = document.createElement('button')
  key.classList.add('key');
  key.innerHTML = keyboard_keys.charAt(i)

  keyboard_container.children[i < 10 ? 0 : i < 19 ? 1 : 2].appendChild(key)

  if (i === 19) {
    key.classList.add('enter')
  } else if (i === 27) {
    key.classList.add('backspace')
  } else {
    key.classList.add('letter-' + keyboard_keys.charAt(i))
  }



  key.addEventListener('click',()=>{
    i === 19 ? enterPress() : i === 27 ? backspacePress() :
    keyPress(keyboard_keys.charAt(i))
  })
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
  }

}

// let rows = document.querySelectorAll('row');

console.log(rows)

let guess = 1;
let tile = 1;

const replayGame = () => {
  target_word = valid_answers[Math.floor(Math.random()*valid_answers.length)]
  guess = 1;
  tile = 1;
}

const replay_button = document.querySelector('#replay')

replay_button.addEventListener('click',()=>{location.reload()})
