// import dom from './modules/dom.js'

// dom.make()

const $ = sel => document.querySelector(sel)
const $$ = sel => document.querySelectorAll(sel)
const el = (ty, cl, co) => {
  let element = document.createElement(ty)
  element.classList.add(cl)
  if (co) {element.textContent = co}
  return element
}

let mileage = localStorage.getItem("mileage")

if (mileage) {
  mileage = JSON.parse(mileage)
} else {
  mileage = [0,0,0,0,0,0,0]
}


const updateNumbers = () => {

  let t = 0
  let alterWholeGraph = false
  for (let i = 0; i < 7; i++) {
    $$('.day')[i].querySelector('.counter').textContent = mileage[i]
    t += mileage[i]

  }

  $('.total').textContent = t

}

const alterGraph = () => {

  let top_day = 0
  for (let i = 0; i < 7; i++) {
    if (mileage[i] > top_day) {
      top_day = mileage[i]
    }
  }


  $$('.day').forEach(day => {
    let graph_bar = day.querySelector('.graph-bar')
    let graph = day.querySelector('.graph')

    graph_bar.style.height = (mileage[(Array.from($$('.day')).indexOf(day))] /(top_day > 20 ? top_day : 20)) * 100 + '%'
  })
}

const changeDayMiles = (m, i) => {


  if (m === 5) {
    mileage[i] += m
    mileage[i] -= (mileage[i] % 5)
  } else if (m === -5) {
    if (mileage[i] % 5 === 0) {
      mileage[i] += m
    } else {
      mileage[i] -= (mileage[i] % 5)
    }
  } else {
    mileage[i] += m
  }
  if (mileage[i] < 0) mileage[i] = 0

  updateNumbers()
  alterGraph()
  localStorage.setItem("mileage", JSON.stringify(mileage))
}

const dom = () => {
  let i = 0
  for (let i = 0; i < 7; i++) {
  // Array.from(['M', 'T', 'W', 'T', 'F', 'S', 'S']).forEach(x => {
    let e = el('span', 'day')
    $('#week-planner').appendChild(e)
    let plus5 = el('button', 'plus5', '5')
    let plus = el('button', 'plus', '+')
    let graph = el('div', 'graph', '')
    let less = el('button', 'less', '-')
    let less5 = el('button', 'less5', '5')
    let counter = el('span', 'counter', '#')
    e.appendChild(plus5)
    e.appendChild(plus)
    e.appendChild(graph)
    e.appendChild(less)
    e.appendChild(less5)
    e.appendChild(counter)

    plus5.addEventListener('click', () => changeDayMiles(5, i))
    plus.addEventListener('click', () => changeDayMiles(1, i))
    less.addEventListener('click', () => changeDayMiles(-1, i))
    less5.addEventListener('click', () => changeDayMiles(-5, i))

    let graph_bar = el('div', 'graph-bar', '')
    graph.appendChild(graph_bar)

    }
    // i++

  // })

  let t = el('div', 'total', '##')
  $('#week-planner').appendChild(t)

}
dom()
updateNumbers()
alterGraph()
