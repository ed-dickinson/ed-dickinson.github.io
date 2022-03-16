const title_text = 'Tumbleword!';

const title_holder = document.querySelector('#intro-title');

title_holder.innerHTML = '';

const title_text_array = title_text.split('')

// limegreen 50, 205, 50
// gold 255, 215, 0

let c1 = [255, 215, 0]
let c2 = [50, 205, 50]
// let changing_color = []
let t1 = title_text.length

for (let i = 0; i < title_text.length; i++) {
  const span = document.createElement('span');
  span.innerHTML = title_text_array[i]
  title_holder.appendChild(span)
  span.classList.add('letter')
  span.style.opacity = 0
  // span.style.color = `rgb(${c1[0]-(((c1[0]-c2[0])/t1)*i)},${c1[1]-(((c1[1]-c2[1])/t1)*i)},${c1[2]+(((c2[2]-c1[2])/t1)*i)})`
  span.style.animationDelay = `${-2 + (i*0.2)}s`
  // span.style.transform = `rotate(${(i*(i/2))/1.5}deg)`
  // span.style.top = `${i<3?0:((i-2)*(i-2))/2}px`
  // span.style.left = `${(i*i)/200}em`

  setTimeout(()=>{span.style.opacity = 1},i*100)
}

const hideTitle = () => {
  title_holder.style.transition = '0.5s'
  title_holder.style.opacity = 0
}

// setTimeout(()=>{
//   title_holder.style.transition = '0.5s'
//   title_holder.style.opacity = 0
//   // title_holder.style.display = 'none'
//
// },(title_text.length+5)*100)

let shimmmer_frame = 0;
const introShimmer = () => {
  if (tiles) {
    let i = shimmmer_frame;
    shimmmer_frame++;
    // let row_array = Array.from(rows[i].children)
    if (i===0) {
      tiles.forEach(tile=>{
        tile.style.transition = '0.1s'
      })
    }

    rows.forEach(row=>{
      let r = rows.indexOf(row)
      let child_array = Array.from(row.children)

      if (i - r < 5 && i - r > -1) {
        child_array[i - r].classList.remove('unloaded')
        child_array[i - r].classList.add('wrong-position')
      }
      if (i - r < 6 && i - r > 0) {
        child_array[i - r - 1].classList.remove('wrong-position')
      }
      if (i - r < 6 && i - r > 0) {
        child_array[i - r - 1].classList.add('right-position')
      }
      if (i - r < 7 && i - r > 1) {
        child_array[i - r - 2].classList.remove('right-position')
      }

    })

    // if (i === 9) {
    //   banner.classList.remove('hidden');
    //   banner.classList.add('opaque');
    //   // banner.classList.remove('transparent');
    //
    // }

    // if (i===10) {
    //   document.querySelector('#buttons').classList.remove('hidden');
    // }

    // if (i === 9) {
    //   dom.intro_banner.classList.remove('hidden');
    //   dom.intro_banner.classList.add('fade-in');
    // }
    if (i === 9) {
      document.querySelector('#buttons').classList.remove('hidden');
      document.querySelector('#big-start').classList.add('loaded');
    }

    if (i > 10) {

      // document.querySelector('#big-start').style.backgroundColor = 'grey';
      clearInterval(intro_shimmer)

      // setTimeout(()=>{intro_banner})
    }

  }
}

let intro_shimmer = setInterval(introShimmer,100)
