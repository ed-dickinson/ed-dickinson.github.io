const tumbleweed_holder = document.querySelector('#tumbleweed');


for (let i = 0; i < 'TUMBLEWEED'.length; i++) {
  let div = document.createElement('div')
  div.innerHTML = 'TUMBLEWEED'.charAt(i)
  div.style.left = `${i*(Math.random()-0.5)*4}px`
  div.style.top = `${i*(Math.random()-0.5)*4}px`
  div.style.transform = `rotate(${Math.random()*360}deg)`
  tumbleweed_holder.appendChild(div)
}
