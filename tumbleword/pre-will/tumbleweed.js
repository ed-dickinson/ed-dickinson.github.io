const tumbleweed_holder = document.querySelector('#tumbleweed');

const letter_objs = [
  {l: -10,t: -2, r: 220},
  {l: 0,t: -4, r: 270},
  {l: 12,t: 0, r: 10},
  {l: 10,t: 4, r: 50},
  {l: 2,t: 4, r: 100},
  {l: -9,t: 3, r: 0},
  {l: -10,t: 1, r: 200},
  {l: 0,t: -1, r: 150},
  {l: 4,t: 2, r: 250},
  {l: 4,t: -1, r: 0}
]


for (let i = 0; i < 'TUMBLEWEED'.length; i++) {
  let div = document.createElement('div')
  div.innerHTML = 'TUMBLEWEED'.charAt(i)
  // div.style.left = `${i*(Math.random()-0.5)*4}px`
  // div.style.top = `${i*(Math.random()-0.5)*4}px`
  // div.style.transform = `rotate(${Math.random()*360}deg)`

  div.style.left = `${letter_objs[i].l}px`
  div.style.top = `${letter_objs[i].t*4}px`
  div.style.transform = `rotate(${letter_objs[i].r}deg)`

  // div.style.left = `${i*4}px`
  // div.style.top = `${i*4}px`
  // div.style.transform = `rotate(${i*20}deg)`
  tumbleweed_holder.appendChild(div)
}

console.log(letter_objs[0].l)
