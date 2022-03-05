const title_text = 'Tumbleword...';

const title_holder = document.querySelector('#intro-title');

title_holder.innerHTML = '';

const title_text_array = title_text.split('')

console.log(title_text.length)

for (let i = 0; i < title_text.length; i++) {
  const span = document.createElement('span');
  span.innerHTML = title_text_array[i]
  title_holder.appendChild(span)
  span.classList.add('letter')
  span.style.opacity = 0
  span.style.transform = `rotate(${(i*(i/2))/1.5}deg)`
  span.style.top = `${(i*i)/4}px`
  span.style.left = `${(i*i)/200}em`

  setTimeout(()=>{span.style.opacity = 1},i*100)
}

setTimeout(()=>{
  title_holder.style.transition = '0.5s'
  title_holder.style.opacity = 0
  // title_holder.style.display = 'none'

},(title_text.length+1.5)*100)
