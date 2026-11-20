const $ = sel => document.querySelector(sel)
const $$ = sel => document.querySelectorAll(sel)
const el = (ty, cl, co) => {
  let element = document.createElement(ty)
  element.classList.add(cl)
  if (co) {element.textContent = co}
  return element
}

// const toggleOverlay = () => {
//   $('#lyrics-overlay').classList.toggle('show')
// }
// $('#lyrics-close').addEventListener('click', toggleOverlay)


// CONSTRUCTOR


let menu_skeleton = [
  {name: 'music', link: '/'},
  {name: 'poems', sub:[
    {name: 'Running Odes', link: '/running-odes'},
    {name: '2026', link: '/2026'}
  ]}
]

let menu = document.querySelector('#dots-menu')

if (menu) {
  console.log('menu!')
  let dots = el('span', 'base', '...')
  menu.appendChild(dots)
}





// let song_data
//
// async function getData() {
//   const url = "../json/songs.json";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//
//     const json = await response.json();
//     console.log(json);
//
//     song_data = json
//   } catch (error) {
//     console.error(error.message);
//   }
// }
//
// getData()

// let dom_tracklist = []
// $('#tracklist').childNodes.forEach(child => {
//   if (child.classList && child.classList.contains('track-title')) {
//     dom_tracklist.push(child)
//   }
// })



// let master =

// fetch('/songs/master.json')
//   .then(response => response.json())
//   .then((data) => {
//     console.log(data)
//   })

// fetch('/lyrics/error.txt')
//   .then(response => response.text())
//   .then((data) => {
//     console.log(data)
//   })




// scrolling behaviours

// $('#top-button').addEventListener('click', () => {
//   window.scrollTo({top:0, left:0,behavior:'smooth'})
//   $('#top-button').classList.add('hidden')
// })

// lyric clicker

// dom_tracklist.forEach(child => {
//
//   let song_name = child.attributes.song.value
//
//   let info = data.find(x => x.key === song_name)
//
//   console.log(info)
//
//   let full_title = el('span', 'title-text', info.title)
//   child.appendChild(full_title)
//   // child.textContent += ' '
//   let emoji = el('span', 'emoji', info.emoji)
//   // child.appendChild(emoji)
//
//
//   // let expander = el('span', 'expander', '〇')
//   let expander = el('span', 'expander', '(...)')
//   child.appendChild(expander)
//
//
//
// })





// 1ch currently 8px with 16px inconsolata!
// $('#player').innerHTML = ''
// for (let i = 0; i < ($('main').offsetWidth / 8); i++) {
//   $('#player').innerHTML += i === 5 ? 'O' : '-'
//
// }


// const setFavicon = (i) => {
//   const favicon = document.querySelector('link[rel="icon"]')
//   favicon.href = 'assets/emoji-'+(i==="play"?'play':'pause')+'.png'
// }
// setFavicon('play')
