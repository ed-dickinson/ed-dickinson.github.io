const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

// document.onscroll = (e) => {
//   console.log(e)
// }
let last_scroll = undefined
addEventListener('scroll', (e) => {
  if (window.scrollY === 0) {
    // show home thing
    $('#website-home').classList.add('show')
  } else if (window.scrollY > 0 && last_scroll === 0) {
    // hide home thing
    $('#website-home').classList.remove('show')
  }
  last_scroll = window.scrollY
})
