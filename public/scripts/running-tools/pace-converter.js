// import dom from './modules/dom.js'

// dom.make()

const $ = sel => document.querySelector(sel)
const $$ = sel => document.querySelectorAll(sel)
const el = (ty, id, co) => {
  let element = document.createElement(ty)
  if (id) element.id.add(id)
  if (co) element.textContent = co
  return element
}

const container = $('#pace-converter')

let input = el('input')
input.type = 'range'
input.min = 240
input.max = 600
input.value = 420
input.step = 1
container.appendChild(input)
