// import dom from './modules/dom.js'

// dom.make()

const $ = sel => document.querySelector(sel)
const $$ = sel => document.querySelectorAll(sel)
const el = (ty, options) => {
  let element = document.createElement(ty)
  if (options) {
    if (options.id) element.id = options.id
    if (options.content) element.textContent = options.content
    if (options.class) element.classList.add(options.class)
  }

  return element
}

let mileage = localStorage.getItem("mileage")

let output

if (mileage) {
  mileage = JSON.parse(mileage)
} else {
  mileage = [0,0,0,0,0,0,0]
}



const sumTotal = () => {
  let t = 0
  for (let i = 0; i < 7; i++) {
    t += Number(mileage[i])

  }
  output.textContent = t
}


const changeDay = () => {

}

const dom = () => {
  let i = 0
  let container = $('#week-planner')
  let days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  for (let i = 0; i < 7; i++) {

    let row = el('div', {class: 'day'})
    let day = el('span', {class: 'label', content: days[i]})
    let input = el('input')
    input.type = 'range'
    input.min = 0
    input.max = 30
    input.value = mileage[i]
    input.step = 1
    container.appendChild(row)
    row.appendChild(day)
    row.appendChild(input)
    let display = el('span', {class: 'output', content: mileage[i]})
    row.appendChild(display)

    input.addEventListener('input', () => {
      display.textContent = input.value
      mileage[i] = input.value
      localStorage.setItem("mileage", JSON.stringify(mileage))
      sumTotal()
    })
    }
    // i++

  // })

  output = el('div', {class: 'total', content: '##'})
  $('#week-planner').appendChild(output)

  output.classList.add('colorfade-animated')

  sumTotal()

}
dom()
// updateNumbers()
// alterGraph()
