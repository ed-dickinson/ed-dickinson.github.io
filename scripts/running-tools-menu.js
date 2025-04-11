const $ = sel => document.querySelector(sel)
const $$ = sel => document.querySelectorAll(sel)
const el = (ty, text, href) => {
  let element = document.createElement(ty)
  // element.classList.add(cl)
  if (text) {element.textContent = text}
  element.setAttribute('href', href)
  return element
}

const tools = [{
  text : 'Pace' ,
  link : 'pace-converter'
},{
  text : 'LTHR',
  link : 'lthr-calculator'
},{
  text : 'Intervals' ,
  link : 'interval-calculator'
},{
  text : 'Week Plan' ,
  link : 'week-planner'
}]

let menu = $('#see-also')

tools.forEach(tool => {
  if (window.location.pathname.split('/')[2] !== tool.link) {
    menu.appendChild(el('a', tool.text, '../' + tool.link))
  }

})

// console.log(window.location.pathname.split('/')[2])
