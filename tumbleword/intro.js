const title_text = 'Tumbleword!';

const title_holder = document.querySelector('#intro-title');

title_holder.innerHTML = '';

const title_text_array = title_text.split('')

// limegreen 50, 205, 50
// gold 255, 215, 0

let c1 = [255, 215, 0]
let c2 = [50, 205, 50]

let t1 = title_text.length

for (let i = 0; i < title_text.length; i++) {
  const span = document.createElement('span');
  span.innerHTML = title_text_array[i]
  title_holder.appendChild(span)
  span.classList.add('letter')
  span.style.opacity = 0

  span.style.animationDelay = `${-2 + (i*0.2)}s`

  setTimeout(()=>{span.style.opacity = 1},i*100)
}

const hideTitle = () => {
  title_holder.style.transition = '0.5s'
  title_holder.style.opacity = 0
}


let shimmmer_frame = 0;
const introShimmer = () => {
  if (tiles && tiles.length === 30) {
    let i = shimmmer_frame;
    shimmmer_frame++;

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

    if (i === 9) {
      document.querySelector('#buttons').classList.remove('hidden');
      document.querySelector('#big-start').classList.add('loaded');
      setTimeout(()=>{
        if (!game_over) {
          document.querySelector('#start-leaderboard').classList.remove('hidden');
        }
      },800)
    }

    if (i > 10) {
      clearInterval(intro_shimmer)
    }

  }
}

let intro_shimmer = setInterval(introShimmer,100)
