import data from '/songs/master.json' with { type: 'json' }
// import data from '/songs/master.js'
console.log('json:', data)

const $ = sel => document.querySelector(sel)
const $$ = sel => document.querySelectorAll(sel)
const el = (ty, cl, co) => {
  let element = document.createElement(ty)
  element.classList.add(cl)
  if (co) {element.textContent = co}
  return element
}

const toggleOverlay = () => {
  $('#lyrics-overlay').classList.toggle('show')
  $('main').classList.toggle('blur')
}
$('#lyrics-close').addEventListener('click', toggleOverlay)


// CONSTRUCTOR



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

let dom_tracklist = []
$('#tracklist').childNodes.forEach(child => {
  if (child.classList && child.classList.contains('track-title')) {
    dom_tracklist.push(child)
  }
})

const fetchLyrics = (song, element) => {
  fetch('/songs/lyrics/' + song + '.txt')
    .then(response => {
      if (response.ok) {
        return response.text()
      }
      else {
        throw new Error('No lyric file for this song.')
      }
      // response.text()
    })
    .then((data) => {
      // console.log(data)
      element.textContent = data
      toggleOverlay()
      // return data
    }).catch(error => {
      element.textContent = 'No lyrics found.'
      toggleOverlay()
      // return 'No lyrics found.'
      throw(error)
    })
  // $('#lyric-box .date').textContent = key.date
}

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

// changes current title year to white if current
if ($('#title-year') && $('#title-year').textContent != new Date().getFullYear()) {
  $('title').textContent += ', ' + $('#title-year').textContent
}


// scrolling behaviours

// $('#top-button').addEventListener('click', () => {
//   window.scrollTo({top:0, left:0,behavior:'smooth'})
//   $('#top-button').classList.add('hidden')
// })

// lyric clicker

dom_tracklist.forEach(child => {

  let song_name = child.attributes.song.value

  let info = data.find(x => x.key === song_name)

  console.log(info)

  let full_title = el('span', 'title-text', info.title)
  child.appendChild(full_title)
  // child.textContent += ' '
  let emoji = el('span', 'emoji', info.emoji)
  // child.appendChild(emoji)


  // let expander = el('span', 'expander', '〇')
  let expander = el('span', 'expander', '(...)')
  child.appendChild(expander)

//✕✖
  expander.addEventListener('click', () => {
    fetchLyrics(song_name, $('#lyrics-content'))

    $('#lyrics-title').textContent = info.title
    // console.log(lyrics)

    $('#lyrics-date').textContent = info.date


  })

// lyrics
  // let wrapper = el('div', 'song')
  // $('#lyrics').appendChild(wrapper)
  //
  // let title = el('div', 'title')
  // title.innerHTML = `<span class="emoji">${info.emoji}</span>`
  // wrapper.appendChild(title)
  //
  // let lyrics = el('div', 'lyrics')
  // fetchLyrics(song_name, lyrics)
  // wrapper.appendChild(lyrics)
  //
  // let date = el('div', 'date')
  // date.textContent = info.date
  // wrapper.appendChild(date)
  //
  // child.querySelector('.emoji').addEventListener('click', () => {
  //   wrapper.scrollIntoView({ behavior: "smooth"})
  //   $('#top-button').classList.remove('hidden')
  // })

  // lazy way to force new line
  // $('#lyrics').appendChild(el('div','line-break',''))
})
console.log('tracklist loaded')

document.addEventListener('scrollend', () => {
  if (window.scrollY === 0) {
    $('#top-button').classList.add('hidden')
  }
})




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

// replace apostrophes
$$('.lyrics, #about p').forEach(text => {
  text.innerHTML = text.innerHTML.replace(/'/g, "’")
})


// SLIDESHOW

let slideshow_i = 0
$('.slideshow').addEventListener('click', () => {
  let old_i = slideshow_i
  let children = Array.from($('.slideshow').children)
  if (slideshow_i === children.length - 1) {
    slideshow_i = 0
  } else {
    slideshow_i++
  }
  children[slideshow_i].style.opacity = 1
  children[old_i].style.opacity = 0
  console.log(children)
})
