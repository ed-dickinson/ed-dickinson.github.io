// import music from "./music.js";

// console.log(music)


// need to do line tracking as music plays
// and to set song if line clicked is from a song not currently playing

/* THIS IS PURELY ELECTRON STUFF

*/

const path = require('path')
const fs = require('fs')
const os = require('os')

const appDir = path.resolve( os.homedir(), 'Documents/self-portrait' )

let electron_obj = {}
let electron_arr = []

/*

*/

const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
const n = (cla, content, parent) => {
  let el = document.createElement('div')
  el.classList.add(cla)
  if (content !== undefined) {el.innerHTML = content}
  if (parent) parent.appendChild(el)
  return el
}

async function api(type, url, data) {
  let options = {
    method: type ,
    headers: {
      "Content-Type": "application/json",
    }
  }
  if (data) options.body = JSON.stringify(data)
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("Success:", result);
    return result
  } catch {
    console.error("Error:", error);
  }
}

const transitions = {
  fadeInAll : () => {
    console.log($('main'))
    $('.initial').classList.add('fadein')
  } ,
  eraFadeOut : () => {
    $('main').classList.remove('fadein')
    $('main').classList.remove('erafadein')
    $('main').classList.add('erafadeout')
  } ,
  eraFadeIn : () => {
    $('main').classList.remove('erafadeout')
    $('main').classList.add('erafadein')
  } ,
  loaded : () => {
    $('#loading-swirl').classList.add('loaded')
  }
}

// music.forEach(song => {
//   console.log(song)
//   let div = n('song')
//   // div.innerHTML = song.lyrics
//   if (song.era === 'early') {
//     $('#dawnforms').appendChild(div)
//   } else {
//     $('#songforms').appendChild(div)
//   }
//
//
//   // let title = n('title')
//   // title.innerHTML = song.title
//   div.appendChild(n('title', song.title))
//   div.appendChild(n('lyrics', song.lyrics))
// })

let globals = {
  latest_era : undefined ,
  eras : undefined , // all eras as a get response
  era : undefined , // sinlge one of those eras
  loaded_songs : [] ,
  current_era : undefined
}

const makeLyrics = (lines, song) => {
  let ol = n('lyrics')

  lines.forEach(line => {
    let el = n('line', line[0])
    if (line[1]) {
      el.classList.add('has-timestamp')
      el.addEventListener('click', () => {
        console.log('skip to',line[1],'in',song)
        let split = line[1].split(':')
        $('audio').currentTime = (parseInt(split[0]) * 60) + parseFloat(split[1])
      })
    }
    ol.appendChild(el)
  })

  return ol
}

const searchValueAhead = (value, lookahead, data) => {
  let era = globals.current_era
  let latest_era = globals.latest_era
  while (era <= latest_era) {
    let next_era = (era + lookahead >= latest_era) ? data : data.history[era + lookahead]

    if (next_era && next_era[value]) {
      return {value: next_era[value], era:era}
    }
    era++
  }

}

const amassLinesForward = (key, data) => {
  let i = 1

  let value_ahead = searchValueAhead('lines', 0, data)

  let array = Array.from(value_ahead.value) // otherwise ref
  let array_copy = [] // this is for adding edit class

  console.log(array)

  // if (custom_length > array.length) {
  //   for (let i = 0; i < custom_length; i++) {
  //     if (!array[i]) {
  //       array.push(null)
  //     }
  //   }
  // } // make up for weird shorter line problem

  for (let i in array) {
    if (array[i] && value_ahead.era===globals.current_era) array_copy[i] = globals.current_era
  }

  // console.log(array.includes(null))
  while (array.includes(null)) {
    let lines_ahead = searchValueAhead('lines', i, data)
    lines_ahead = Array.from(lines_ahead.value)

    for (let j = 0; j < array.length; j++) {
      if (array[j] === null) {
        array[j] = []
        if (lines_ahead[j] === null) array[j] = null
        else array[j][0] = lines_ahead[j][0]
      }
      if (lines_ahead[j] && lines_ahead[j][1]) array[j][1] === lines_ahead[j][1]
    }
    // console.log(array, lines_ahead, i)
    i++
  }
  // checks for timestamps
  while ((i + globals.current_era) <= globals.latest_era && array.some((a)=>{
    return ((a[0] !== '') && (!a[1])) ? true : false
  })) {

    let lines_ahead = searchValueAhead('lines', i, data)
    lines_ahead = Array.from(lines_ahead.value)

    for (let j = 0; j < array.length; j++) {
      if (lines_ahead[j] && lines_ahead[j][1]) {
        array[j][1] = lines_ahead[j][1]
      }
    }

    i++
  }

  // return {lines : array , edits : array_copy}
  return array
}

const collateForwards = (data) => {
  let era = globals.current_era
  let latest_era = globals.latest_era
  // console.log(data, era, latest_era)
  if (era === latest_era || !data.history) { // filters out current era / no hist
    return data
  } else {
    let output = new Object()
    for (const [key, value] of Object.entries(data)) {
      console.log(key, value)
      if (key === 'lines') {
        // let lines =
        output.lines = amassLinesForward(key, data)
      } else if (key !== 'history') {
        output[key] = searchValueAhead(key, 0, data).value
      }
    }
    return output
  }
}

const makeSongform = (song) => {
  let data = collateForwards(song.data)

  let el = $('.songform.' + song.song)
  if (data.extended_title) el.appendChild(n('title', data.extended_title))
  else if (data.title) el.appendChild(n('title', data.title))

  if (data.lines) {
    // console.log(data.lines)
    let ar = makeLyrics(data.lines, song.song)
    el.appendChild(ar)
  }

  if (data.date) el.appendChild(n('date', data.date))

  // console.log(el)
  return el
  // $('#songforms').appendChild(el)
}

const updateTitles = (songlist) => {
  for (let i of songlist) {
    // console.log(i)
    let song = globals.loaded_songs.find(s => s.song === i)
    let children = Array.from($('#contents').children)
    // console.log(children)
    let child = children.find(c => c.textContent === i)
    if (child) child.textContent = song.data.title || song.data.extended_title
  }
}

const fillInDOM = (song) => {
  // song.song, song.data
  // console.log(song)
  let title = $('.contents-title.' + song.song)
  title.textContent = song.data.title || song.data.extended_title

  let el = makeSongform(song)

  title.addEventListener('click', ()=>{
    console.log('scrollto', el)
    window.scrollTo({top: el.parentNode.offsetTop, left: 0, behavior: 'smooth'}) // parnode
    console.log('PLAY', song.song)
    let audio_location = 'http://127.0.0.1:8080' + document.URL.slice(27) + '/' + song.song + '/' + song.data.file // this is fucked, don't use this
    $('audio').src = audio_location
    $('audio').play()
  })
}

const updateSongList = (era, type) => {
  let old_found = globals.eras.find(a=>a.era === globals.era)
  globals.era = era
  let found_era = globals.eras.find(a=>a.era === era)
  // console.log(era,':',found_era)
  // found is an array of song_refs
  // globals eras is an array of already loaded eras

  //
  let scroll_pos = workOutScrollPosition()


  let promises = []

  let electrons = []
  // collect promises of all songs that haven't been fetched
  for (let s of found_era.songlist) {

    let found_song = globals.loaded_songs.find(a => a.song === s)
    if (!found_song) {
      // let call = api('GET', url + '/songs/' + s + '/json')
      let call = api('GET', url + '/songs/' + s + '/info.json')
      call.s = s
      promises.push(call)
      electrons.push(s)
      // electron_obj[s]
      let obj = {song: s, call: call}
      // obj =
      electron_arr.push(obj)
    }
  }

  if (type !== 'onpageload') {
    promises.push( // this is to delay timeout for fade
      new Promise((resolve, reject) => setTimeout(() => resolve('-'), 250))
    )
  }


  // when fulfilled, fill them out in the DOM
  // Promise.all(promises).then((values) => {
  Promise.all(electrons.map(function(file) {
    return api('GET', url + '/songs/' + file + '/info.json').then(function(content) {
      return {data: content, song: file}
    })
  })).then((values) => {
    values.forEach(response => {
      globals.loaded_songs.push(response)
      console.log(response)
      console.log(electron_arr.find(a => a.call === response))
    })
    $('#contents').replaceChildren()
    $('#songforms').replaceChildren()
    for (let s of found_era.songlist) {
      let found_song = globals.loaded_songs.find(a => a.song === s)

      let el = n('contents-title', s)
      let el_songforms = n('songform')
      let el_songform_wrapper = n('songform-wrapper')

      $('#contents').appendChild(el)
      $('#songforms').appendChild(el_songform_wrapper)
      el_songform_wrapper.appendChild(el_songforms)

      el.classList.add(s)
      el_songforms.classList.add(s)

      // el_songforms.appendChild(n('notes', `<img src='./assets/notes/${s}.png' />`))

      fillInDOM(found_song)

    }
    if (type !== 'onpageload') scrollToScrollPosition(scroll_pos)
    type === 'onpageload' ? transitions.fadeInAll() : transitions.eraFadeIn()
    console.log(type)
  })


}

const updateEra = (i) => {
  let era = globals.eras.find(a=>a.era === i)
  let blurb = $('#blurb .era-blurb')
  if (era.blurb) {
    if (blurb) {
      blurb.textContent = era.blurb
    } else {
      $('#blurb').appendChild(n('era-blurb', era.blurb))
    }
  } else {
    if (blurb) blurb.remove()
  }
  let blurb_date = $('#blurb .era-blurb-date')
  if (era.date) {
    if (blurb_date) {
      blurb_date.textContent = era.date
    } else {
      $('#blurb').appendChild(n('era-blurb-date', era.date))
    }
  } else {
    if (blurb_date) blurb_date.remove()
  }

}


const getPos = (el, rel) => {
  let y = 0
  do {
    y += el.offsetTop
    el = el.offsetParent
  } while (el != rel) // non strict equality is essential for proper functioning
  return y
}

const workOutScrollPosition = () => {
  // list of all elements that require position tracking
  let els = $$('.era-blurb, #contents, .songform-wrapper')
  let i = 0
  // 50 adjusts for only just in viewport
  while (window.scrollY + 50 > els[i].getBoundingClientRect().top + window.scrollY) {
    i++
  } // this stops when it finds the next elements start in view
  // for longer poems might need to change this for next element NOT in view / element
  //els[i] is now first element with start in view
  let el_to_top = els[i].getBoundingClientRect().top + window.scrollY
  let el_to_window = els[i].getBoundingClientRect().top
  // let el_to_top = getPos(els[i])
  // let el_to_window = getPos(els[i]) - window.scrollY
  let song = undefined
  if (els[i].classList.contains('songform-wrapper')) song = els[i].children[0].classList[1]
  let el_index = Array.from(els[i].parentNode.children).indexOf(els[i])
  return ({
    element: els[i], window_offset: el_to_window,
    el_index: el_index,
    song: song, total_offset: el_to_top
  })
}

const scrollToScrollPosition = (input) => {
  if (input.song) {
    console.log('song:', input.song)
    // it was working all along! it just selected the song with the class
    let selector = '.songform.' + input.song
    let new_el = $(selector)
    // || $('#songforms').children[input.el_index]
    let new_index
    if (new_el) new_index = Array.from(new_el.parentNode.children).indexOf(new_el)
    else new_el = $('#songforms').children[input.el_index]

    // let el_offset = getPos(new_el)
    let el_offset = new_el.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, el_offset - input.window_offset)
  } else {

    if (!input.element.classList.contains('era-blurb')) {
      console.log('contents')
      window.scrollTo(0, getPos(input.element) - input.window_offset)
    } else {
      console.log('blurb')
    }

  }

}

const changeEra = (direction) => {
  if (direction === 'forth') {
    if (globals.current_era === globals.latest_era) return
    globals.current_era++
  } else if (direction === 'back') {
    if (globals.current_era === 0) return
    globals.current_era--
  }

  setTimeout(()=> $('#gobackintime .readout').innerHTML = globals.current_era, 250)
  transitions.eraFadeOut()
  updateSongList(globals.current_era) // includes timeout
  setTimeout(()=> updateEra(globals.current_era),250)
}

$('#gobackintime .readout').innerHTML = globals.current_era
$('#gobackintime').addEventListener('click', ()=>{
  changeEra('back')
})
$('#goforeintime').addEventListener('click', ()=>{
  changeEra('forth')
})




// let url = 'http://localhost:8080'

let url = path.resolve( os.homedir(), 'Documents/self-portrait' )

// api('GET', url + '/eras/json').then(response => {
api('GET', url + '/songs/eras.json').then(response => {

  response.reverse()

  globals.latest_era = response[0].era
  console.log(response)
  globals.eras = response

  globals.current_era = globals.latest_era
  $('#gobackintime .readout').innerHTML = globals.current_era
  updateSongList(globals.current_era, 'onpageload')
  updateEra(globals.current_era)

  $('#contents-heading').classList.remove('hidden')

  // transitions.fadeInAll()
  transitions.loaded()
})

// const spinner = (el) => {
//   let interval, i = 0
//   el.addEventListener('mouseover', ()=>{
//     interval = setInterval(()=>{
//       i++
//       el.style.transform = `rotate(${i}deg)`
//     },50)
//   })
//   el.addEventListener('mouseleave', ()=>{
//     clearInterval(interval)
//   })
// }
//
// $$('.swirl1, .swirl2, .songform-wrapper::before').forEach(el => {
//   spinner(el)
// })

$('#note-toggle').addEventListener('click', () => {
  let note_toggle = $('#note-toggle')
  note_toggle.classList.toggle('on')
  note_toggle.parentNode.classList.toggle('notes-visible')
  // if (note_toggle.classList.contains('on')) {
  //   note_toggle.classList.remove('on')
  // } else {
  //   note_toggle.classList.add('on')
  // }
})
