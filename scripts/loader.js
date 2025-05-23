let circ = document.querySelector('#circular')

let array = []
let temp_array = []

let split = circ.textContent.split('')
circ.textContent = ''
for (let i in split) {
  let letter = split[i]
  let el = document.createElement('span')
  let el2 = document.createElement('span')

  // el2.textContent = letter

  circ.appendChild(el)
  el.appendChild(el2)

  let el3 = document.createElement('span')
  el3.textContent = letter
  el2.appendChild(el3)


  el.style.transform = i > 2
    ? `rotate(${180 + (i * 36)}deg) scaleY(-1)`
    : `rotate(${i * 36}deg)`
  if (i > 2) {
    el.style.transform = `rotate(${180 + (i * 36)}deg) scaleY(-1)`
    el2.style.transform = 'scaleY(-1) rotate(0deg)'
    // temp_array.push(el2)
    temp_array.push(el3)
  } else {
    el.style.transform = `rotate(${i * 36}deg)`
    // array.push(el2)
    array.push(el3)
  }
}
temp_array.reverse()
temp_array.forEach(val => {
  array.push(val)
})
array.push(document.querySelector('#sun'))

if (navigator.userAgent.includes('Safari')) {
  document.querySelector('#sun').classList.add('safari')
}

// for (let i in array) {
//   // setTimeout(()=>array[i].classList.add('appear'), i*150)
//   setTimeout(()=> array[i].classList.add('appear'), i*150)
//   setTimeout(()=>array[i].classList.add('color-anim'), (i*150))
//
//   setTimeout(()=>{
//     // array[i].style.color = 'black'
//     array[i].classList.remove('color-anim')
//   }, 1000 + (i*150))
//   // 1350 is last one
// }

for (let i in array) {
  // setTimeout(()=>array[i].classList.add('appear'), i*150)
  if (i === 9) {
    setTimeout(()=> array[i].classList.add('appear'), i*150)
    setTimeout(()=>array[i].classList.add('color-anim'), (i*150))
  } else {
    setTimeout(()=> array[i].classList.add('appear'), i*150)
    setTimeout(()=>array[i].classList.add('color-anim'), (i*150))
  }

  // setTimeout(()=>{
  //   // array[i].style.color = 'black'
  //   array[i].classList.remove('color-anim')
  // }, 1000 + (i*150))
  // 1350 is last one
}

setTimeout(()=>document.querySelector('#sun').firstChild.classList.add('pulse-anim'), 2000)
setTimeout(()=>document.querySelector('#sun').firstChild.classList.remove('pulse-anim'), 3000)

document.querySelector('#loader').addEventListener('click', () => {
  document.querySelectorAll('.color-anim').forEach(el => {
    el.classList.remove('color-anim')
  })
  document.querySelector('#loader').classList.add('spin-anim')
  setTimeout(()=>{
    document.querySelector('#loader').classList.remove('spin-anim')
  },1000)
})

// document.querySelector('#circular').classList.remove('pre-load')

// setTimeout(()=>document.querySelector('#loader').classList.add('shrinkout-anim'), 3000)
// setTimeout(()=>document.querySelector('#loader').classList.remove('shrinkout-anim'), 3250)
// setTimeout(()=>document.querySelector('#loader').classList.add('reappear-anim'), 3250)
