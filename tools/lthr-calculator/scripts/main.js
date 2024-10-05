import dom from './modules/dom.js'

console.log('main.js')

dom.function()

const $ = sel => document.querySelector(sel)
// const $$ = sel => document.querySelectorAll(sel)

const changeLTHR = () => {
  console.log($('#lthr').value)
  let lthr = $('#lthr').value
  $('#lthr-out').textContent = lthr

  // david roche
  $('#zone2 output').textContent = (lthr * 0.8).toFixed(0)
  $('#zone3 output').textContent = (lthr * 0.88).toFixed(0)
  $('#zone4 output').textContent = (lthr * 0.94).toFixed(0)
  $('#zone5 output').textContent = (lthr * 1).toFixed(0)

  // joe friel
  // $('#zone2 output').textContent = (lthr * 0.85).toFixed(0)
  // $('#zone3 output').textContent = (lthr * 0.90).toFixed(0)
  // $('#zone4 output').textContent = (lthr * 0.95).toFixed(0)
  // $('#zone5 output').textContent = (lthr * 1).toFixed(0)

  // garmin
  // $('#zone2 output').textContent = (lthr * 0.79).toFixed(0)
  // $('#zone3 output').textContent = (lthr * 0.91).toFixed(0)
  // $('#zone4 output').textContent = (lthr * 1.03).toFixed(0)
  // $('#zone5 output').textContent = (lthr * 1.09).toFixed(0)

  //garmin 79, 91
}

changeLTHR()

$('#lthr').addEventListener('input', changeLTHR)

const showZoneInfo = (z) => {
  Array.from($('#zone-info').children).forEach(child => {
    child.style.display = 'none'
  })
  $('#zone-info').children[z].style.display = 'inline-block'
}

for (let i = 0; i < 5; i++) {
  let zone = $('#zones').children[i]
  zone.addEventListener('mouseover', () => {
    showZoneInfo(i)
  })
  zone.addEventListener('click', () => {
    showZoneInfo(i)
  })
}
// Array.from($('#zones').children).forEach(child => {
//   console.log(child)
//   let child
//   child.addEventListener('mouseover', () => {
//
//   })
// })


let title_letters = $('#title').innerHTML

title_letters = title_letters.split('')

$('#title').innerHTML = ''

// const changeColor = (element) => {
//   let range = element.getAttribute('max') - element.getAttribute('min')
//   let min = element.getAttribute('min')
//   element.value
//   let percentage = ((parseFloat(element.value) - min) / range ) * 100
//   console.log(percentage)
//
//   let hsl_color = `hsl(${percentage*2.5}, 100%, 50%)`
//   element.style.backgroundColor = hsl_color
//   element.style.borderColor = hsl_color
// }


let color_i = 0
title_letters.forEach(letter => {
  let element = document.createElement('span')
  element.innerHTML = letter
  $('#title').appendChild(element)
  element.style.color = `hsl(${color_i}, 100%, 50%)`
  color_i += 10
  if (color_i === 360) {color_i = 0}
})
