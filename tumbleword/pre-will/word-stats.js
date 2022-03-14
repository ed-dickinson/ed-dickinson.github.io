console.log('valid answers:', valid_answers.length)
console.log('valid guesses:', valid_guesses.length)

let z = valid_answers[0];

// let word_array = [valid_answers[0], valid_answers[1], valid_answers[2]];
let word_array = valid_answers;

let letter_object = {};
let letter_object_uniques = {};

let alphabet = 'qwertyuiopasdfghjklzxcvbnm';
alphabet.split('').forEach(letter => {
  letter_object[letter] = 0;
  letter_object_uniques[letter] = 0;
})





word_array.forEach(word => {

  let letters_in_word = [];
  let letter_array = word.split('');
  // console.log(letter_array)
  letter_array.forEach(letter => {
    letter_object[letter] += 1;
    // console.log(letters_in_word.includes(letter))
    if (letters_in_word.includes(letter) !== true) {
      letter_object_uniques[letter] += 1;
    }
    letters_in_word.push(letter);

  })


})

console.log(letter_object)

console.log(letter_object_uniques)
