let header_text = document.querySelector('#named-header')

const dom = {
  body : document.querySelector('body'),
  main : document.querySelector('main'),
  intro_spacer : document.querySelector('.intro-spacer'),
  nav : document.querySelector('nav'),
  inner : document.querySelector('.inner')
}

console.log(header_text, header_text.offsetWidth, header_text.parentNode.offsetWidth)
console.log(header_text.offsetWidth / header_text.parentNode.offsetWidth)

header_text.style.fontSize = header_text.parentNode.offsetWidth / header_text.offsetWidth * 1 + 'em'


// dom.intro_spacer.style.height = (header_text.offsetHeight * 0.7) + 'px'
// dom.intro_spacer.style.marginTop = (header_text.offsetHeight * 0.7) + 'px'
dom.inner.style.marginTop = (header_text.offsetHeight * 0.7) + 'px'





let sections = Array.from(document.querySelectorAll('section'))


let nav_links = Array.from(document.querySelector('nav').children)

console.log(sections, nav_links)

const changeSection = (new_section, color) => {
  sections.forEach(section => {
    section.style.display = 'none'
  })
  new_section.style.display = 'block'
  dom.main.style.backgroundColor = color
  console.log(color)
}

// nav_links[0].addEventListener('click', () => {
//   changeSection(sections[0], 'pink')
// })
header_text.addEventListener('click', () => {
  console.log('hello')
  changeSection(sections[0], 'pink')
}, true)

nav_links[2].addEventListener('click', ()=> {
  changeSection(sections[1], 'khaki')
}, false)
nav_links[1].addEventListener('click', ()=> {
  changeSection(sections[2], 'mediumaquamarine')
}, true)

// mediumturquoise , mediumaquamarine , aquamarine , mediumseagreen , lightseagreen , paleturquoise , powderblue

// sandybrown , khaki , burlywood

// cadetblue

// MOBILE

if (window.innerWidth < 500) {
  dom.nav.style.top = (header_text.offsetHeight * 0.7) + 15 + 'px'
  dom.inner.style.marginTop = (header_text.offsetHeight * 0.7) + dom.nav.clientHeight + 10 + 'px'
}
