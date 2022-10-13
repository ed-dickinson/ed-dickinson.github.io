// document.cookie = 'last-visited=' + new Date().getTime()
// const checkForAnim = () => {
//   if (localStorage.getItem('last-visited') === null) {
//     return true
//   }
//   // if over 24 hours ago
//   if ((parseInt(localStorage.getItem('last-visited')) + (1000 * 60 * 60 * 24)) > new Date().getTime()) {
//     return false
//   } else {
//     return true
//   }
// }
//
// console.log(localStorage.getItem('last-visited'), new Date().getTime())
//
// let do_intro_anim = checkForAnim()
// localStorage.setItem('last-visited', new Date().getTime());
//
// console.log(do_intro_anim)

// let header_dom = document.querySelector('header')
//
// header_dom.style.marginTop = (window.innerHeight / 2) - (header_dom.offsetHeight / 2) + 'px'

let header_dom = document.querySelector('header')
let spacer = document.querySelector('#intro-spacer')

// if (do_intro_anim) {
//   let spacer_height = (window.innerHeight / 2) - (header_dom.offsetHeight / 1) - 20 + 'px'
//
//   spacer.style.height = spacer_height
//
//   // sets root value for smooth animation - only way of js affecting css keyframes
//   document.documentElement.style.setProperty('--spacer-height', spacer_height);
// }

let mobile_check = window.innerWidth < 600
let spacer_height = (window.innerHeight / 2) - (header_dom.offsetHeight / (mobile_check ? 1.5 : 1)) - 20 + 'px'



spacer.style.height = spacer_height

// sets root value for smooth animation - only way of js affecting css keyframes
document.documentElement.style.setProperty('--spacer-height', spacer_height);







let title = 'Ed Dickinson'

let dom = {
  title : document.querySelector('#main-title') ,
  main : document.querySelector('main'),
  footer : document.querySelector('footer')
}

const unselectAllArticles = () => {
  document.querySelector('.selected').classList.remove('selected')
}

let articles = document.querySelectorAll('article')
let article_heights = []

let first_open = true
const firstOpen = (button_i) => {

  spacer.classList.add('shrink-spacer')

  articles.forEach(article => {
    article_heights.push(article.offsetHeight)
  })

  document.documentElement.style.setProperty('--article-height-1', article_heights[button_i] + 'px')

  document.querySelectorAll('article.initial-load').forEach(article => {
    article.classList.remove('initial-load')
  })

  dom.main.classList.add('article-open')
  setTimeout(()=>{
    dom.main.classList.add('add-bottom-border')
  }, 1000)

  first_open = false
}

const setUpButton = (button, target, name) => {


  button.addEventListener('click', () => {

    let button_i = Array.from(button.parentNode.children).indexOf(button)

    if (first_open) {

      firstOpen(button_i)
    } else {
      dom.main.classList.remove('article-open')
      dom.main.style.height = article_heights[button_i] + 'px'
      // dom.main.classList.add('article-close')
    }
    // else {
    //
    //   dom.main.classList.add('article-close')
    //   document.querySelector('article.selected')
    //
    //   // document.querySelector(target)
    // }

    title = name === 'Home' ? 'Ed Dickinson' : name
    document.querySelector('article.selected').classList.remove('selected')
    document.querySelector(target).classList.add('selected')
    dom.title.textContent = name === 'Home' ? 'Ed Dickinson' : name // is this nesc? for mob

    // if (!first_open) dom.main.style.height = article_heights[button_i] + 'px'

    localStorage.setItem('last-article', button_i)

  })
  button.addEventListener('mouseenter', () => {
    dom.title.textContent = name
  })
  document.querySelector('menu').addEventListener('mouseleave', () => {
    dom.title.textContent = title
  })
}

setUpButton(document.querySelector('button#home-link'), '#about', 'Home')
setUpButton(document.querySelector('button#laptop'), '#projects', 'Projects')
setUpButton(document.querySelector('button#spanner'), '#tools', 'Tools')

dom.title.addEventListener('click', ()=> {
  if (first_open) firsOpen(0)
})

document.querySelector('#read-more').addEventListener('click', () => {
  document.querySelector('#extra-text').classList.add('expanded')
})
