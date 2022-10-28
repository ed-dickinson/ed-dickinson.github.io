
let redirect_url = sessionStorage.getItem('last-url')

let redirected_ago = sessionStorage.getItem('redirect-time') === null ? null : new Date().getTime() - sessionStorage.getItem('redirect-time')

console.log('redirect landing:', redirected_ago, 'ms ago')

// redirect timer under 2s
let was_redirect = redirected_ago === null ? false : (redirected_ago < 2000)

console.log('redirect', was_redirect)

let title = 'Ed Dickinson'

let dom = {
  title : document.querySelector('#main-title') ,
  main : document.querySelector('main'),
  footer : document.querySelector('footer')
}

const titleStuff = (target, name) => {
  title = name === 'About' ? 'Ed Dickinson' : name
  document.querySelector('article.selected').classList.remove('selected')
  document.querySelector(target).classList.add('selected')
  dom.title.textContent = name === 'About' ? 'Ed Dickinson' : name // is this nesc? for mob
}

// if (redirect_url !== null) {
if (was_redirect) {
  // all redirect stuff
  // redirect address bar
  let first_cap = redirect_url.charAt(0).toUpperCase() + redirect_url.slice(1)
  window.history.pushState(redirect_url, first_cap, redirect_url)

  document.querySelector('body').classList.add('no-intro')

  titleStuff(`#${redirect_url}`, first_cap)
}

// document.cookie = 'last-visited=' + new Date().getTime()
const checkForAnim = () => {
  // if (redirect_url !== null) {
  if (was_redirect) {
    return false
  }
  if (localStorage.getItem('last-visited') === null) {
    return true
  }
  // if over 24 hours ago
  if ((parseInt(localStorage.getItem('last-visited')) + (1000 * 60 * 60 * 24)) > new Date().getTime()) {
    return false
  } else {
    return true
  }
}

let do_intro_anim = checkForAnim()
localStorage.setItem('last-visited', new Date().getTime());

let header_dom = document.querySelector('header')
let spacer = document.querySelector('#intro-spacer')

if (do_intro_anim) {
  let mobile_check = window.innerWidth < 600
  let spacer_height = (window.innerHeight / 2) - (header_dom.offsetHeight / (mobile_check ? 1.5 : 1)) - 20 + 'px'

  spacer.style.height = spacer_height

  // sets root value for smooth animation - only way of js affecting css keyframes
  document.documentElement.style.setProperty('--spacer-height', spacer_height);
} else {
  document.querySelector('body').classList.add('no-intro')
}


const unselectAllArticles = () => {
  document.querySelector('.selected').classList.remove('selected')
}

let articles = document.querySelectorAll('article')
let article_heights = []


let first_open = true

if (!do_intro_anim) first_open = false

const firstOpen = (button_i) => {

  spacer.classList.add('shrink-spacer')

  // set up article heights
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
      titleStuff(target, name)
    } else {

      dom.main.style.height = document.querySelector('article.selected').offsetHeight + 'px'
      dom.main.classList.remove('article-open')
      dom.main.style.transition = 'height 0.75s'
      setTimeout(()=>{dom.main.style.height = 0 + 'px'},1)
      setTimeout(()=>{
        titleStuff(target, name)
        let new_height = document.querySelector(target).offsetHeight
        setTimeout(()=>{

          dom.main.style.transition = 'height ' + (new_height / 1000) + 's'
          dom.main.style.height = new_height + 'px'
        }, 1) // changes delay time to
      },750)

    }

    sessionStorage.setItem('last-url', name.toLowerCase())

    window.history.pushState(name.toLowerCase(), name, `/${name.toLowerCase()}`)

  })
  button.addEventListener('mouseenter', () => {
    dom.title.textContent = name
  })
  document.querySelector('menu').addEventListener('mouseleave', () => {
    dom.title.textContent = title
  })
}

setUpButton(document.querySelector('button#home-link'), '#about', 'About')
setUpButton(document.querySelector('button#laptop'), '#projects', 'Projects')
setUpButton(document.querySelector('button#spanner'), '#tools', 'Tools')

dom.title.addEventListener('click', ()=> {
  if (first_open) firstOpen(0)
})

document.querySelector('#read-more').addEventListener('click', () => {
  document.querySelector('#extra-text').classList.add('expanded')
})
