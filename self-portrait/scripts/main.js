// import music from "./music.js";
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

/* THIS IS ELECTRON STUFF */

// checks if running on electron
let electron_env = window.process && window.process.argv.includes('electron-daddy')

electron_env && $$('.electron').forEach(e => e.classList.add('show'))

const path = electron_env ? require('path') : null
const os = electron_env ? require('os') : null
// const appDir = path.resolve( os.homedir(), 'Documents/self-portrait' )
// let electron_arr = []

/* UNTIL HERE (and some more later) */

// if switch era and song is playing, if song is on era, switch it to that point in the song (or play until song finishes) if song is not, then leave on til ends, then play first song of new era

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
    const response = await fetch(url, options)
    const result = await response.json()
    return result
  } catch {
    console.log("Error, caught promise")
  }
}

const transitions = {
  fadeInAll : () => {
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

const domStuff = {
  updatePlayState : (audio) => {
    if (audio.paused) {
      $('#player').classList.add('paused')
      $('#player').classList.remove('playing')
    } else {
      $('#player').classList.add('playing')
      $('#player').classList.remove('paused')
    }
  } ,
  updateTrackTitle : (title) => {
    $('#player #title-playing').textContent = ' ' + title
  } ,
  checkForHighlightedLyric : () => {
    if ($('.current-lyric')) {
      $('.current-lyric').classList.remove('current-lyric')
    }
  } ,
  hideEraSprites : () => {
    $('#goforeintime').style.display = 'none'
    $('#gobackintime').style.display = 'none'
  }
}

const audioStuff = {
  loadSong : (song) => {
    let audio_location = `${url}songs/${song.song}/${song.data.file}`
    console.log('loc', url)
    $('audio').src = audio_location
    $('audio').song = song.song // used in update()
    // domStuff.updateTrackTitle(song.extended_title ? song.extended_title : song.title)
  }
}


let globals = {
  latest_era : undefined ,
  eras : undefined , // all eras as a get response
  era : undefined , // sinlge one of those eras
  loaded_songs : [] ,
  current_era : undefined
}

let controls = {

}

const convertTimestamp = (timestamp) => {
  let split = timestamp.split(':')
  return (parseInt(split[0]) * 60) + parseFloat(split[1])
}

const makeLyrics = (lines, song) => {
  let ol = n('lyrics')

  for (let i in lines) {
    let line = lines[i]
    let el = n('line', line)
    let timestamp
    if (song.data.timestamps) {timestamp = song.data.timestamps[i]}
    if (timestamp) {
      el.classList.add('has-timestamp')
      el.addEventListener('click', () => {
        domStuff.checkForHighlightedLyric()
        if ($('audio').src !== `${url}songs/${song.song}/${song.data.file}`) {
          audioStuff.loadSong(song)
          domStuff.updateTrackTitle(song.data.extended_title ? song.data.extended_title : song.data.title)
        }
        $('audio').currentTime = convertTimestamp(timestamp)
        if ($('audio').paused) $('audio').play()
        domStuff.updatePlayState($('audio'))
      })
    }
    ol.appendChild(el)
  }

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

  for (let i in array) {
    if (array[i] && value_ahead.era===globals.current_era) array_copy[i] = globals.current_era
  }
  // array is working
  while (array.includes(null)) {
    // lines_ahead is staggered era-current in loop
    let lines_ahead = searchValueAhead('lines', i, data)
    lines_ahead = Array.from(lines_ahead.value)

    for (let j = 0; j < array.length; j++) {
      if (array[j] === null) {
        array[j] = []
        if (lines_ahead[j] === null) array[j] = null
        else array[j] = lines_ahead[j]
      }
    }
    i++
  }
  // checks for timestamps
  while ((i + globals.current_era) <= globals.latest_era && array.some((a)=>{
    return ((a[0] !== '') && (!a[1])) ? true : false
  })) {
    let lines_ahead = searchValueAhead('lines', i, data)
    lines_ahead = Array.from(lines_ahead.value)
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
      if (key === 'lines') {
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
    let ar = makeLyrics(data.lines, song)
    el.appendChild(ar)
  }

  if (data.date) el.appendChild(n('date', data.date))

  return el
}

const updateTitles = (songlist) => {
  for (let i of songlist) {
    let song = globals.loaded_songs.find(s => s.song === i)
    let children = Array.from($('#contents').children)
    let child = children.find(c => c.textContent === i)
    if (child) child.textContent = song.data.title || song.data.extended_title
  }
}

const fillInDOM = (song) => { // song.song, song.data

  let title = $('.contents-title.' + song.song)
  title.textContent = song.data.title || song.data.extended_title

  let el = makeSongform(song)

  title.addEventListener('click', ()=>{
    window.scrollTo({top: el.parentNode.offsetTop, left: 0, behavior: 'smooth'}) // parnode
    console.log('PLAY', song.song, song.data)
    // let audio_location = 'http://127.0.0.1:8080' + document.URL.slice(27) + '/' + song.song + '/' + song.data.file // this is fucked, don't use this
    domStuff.checkForHighlightedLyric()

    audioStuff.loadSong(song)
    $('audio').play()
    domStuff.updatePlayState($('audio'))
    domStuff.updateTrackTitle(song.data.extended_title ? song.data.extended_title : song.data.title)
  })
}

const updateSongList = (era, type) => { // this is a physical dom thing
  let old_found = globals.eras.find(a=>a.era === globals.era)
  globals.era = era
  let found_era = globals.eras.find(a=>a.era === era)
  // found is an array of song_refs
  // globals eras is an array of already loaded eras
  let scroll_pos = workOutScrollPosition()

  let promises = []
  let electrons = []
  // collect promises of all songs that haven't been fetched
  for (let s of found_era.songlist) {

    let found_song = globals.loaded_songs.find(a => a.song === s)
    if (!found_song) {
      // let call = api('GET', url + '/songs/' + s + '/json')
      let call = api('GET', url + 'songs/' + s + '/info.json')
      call.s = s
      promises.push(call)
      electrons.push(s)
      // electron_obj[s]
      let obj = {song: s, call: call}
      // electron_arr.push(obj)
    }
  }

  if (type !== 'onpageload') {
    console.log('not page load - summin not workin')
    promises.push( // this is to delay timeout for fade
      new Promise((resolve, reject) => setTimeout(() => resolve('-'), 250))
    )
  }

  // when fulfilled, fill them out in the DOM
  // Promise.all(promises).then((values) => {
  Promise.all(electrons.map(function(file) {
    return api('GET', url + 'songs/' + file + '/info.json').then(function(content) {
      return {data: content, song: file}
    })
  })).then((values) => {
    values.forEach(response => {
      globals.loaded_songs.push(response)
      // console.log(response)
      // console.log(electron_arr.find(a => a.call === response))
    })
    // $('#contents').replaceChildren()
    // $('#songforms').replaceChildren() // not supported by safari pre13
    $('#contents').textContent = ''
    $('#songforms').textContent = ''
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
  })

}


const updateEra = (i) => { // this is a dom thing
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
  // 50 adjusts for only just in viewport // first i<els condition fixes GBCR undefined
  while (i < els.length - 1 && (window.scrollY + 50 > els[i].getBoundingClientRect().top + window.scrollY)) {
    console.log(els, i)
    i++
  } // this stops when it finds the next elements start in view
  // for longer poems might need to change this for next element NOT in view / element
  //els[i] is now first element with start in view
  let el_to_top = els[i].getBoundingClientRect().top + window.scrollY
  let el_to_window = els[i].getBoundingClientRect().top

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
    let selector = '.songform.' + input.song
    let new_el = $(selector)
    let new_index
    if (new_el) {
      new_index = Array.from(new_el.parentNode.children).indexOf(new_el)
    } else {
      new_el = $('#songforms').children[input.el_index]
    }
    let el_offset = new_el.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, el_offset - input.window_offset)
  } else {
    if (!input.element.classList.contains('era-blurb')) {
      window.scrollTo(0, getPos(input.element) - input.window_offset)
    }
  }

}

const changeEra = (direction) => {
  if (direction === 'forth') {
    if (globals.current_era === globals.latest_era) return
    globals.current_era++
  } else if (direction === 'back') {
    if (globals.current_era === 0 || globals.eras.indexOf(globals.eras.find(x => x.era === globals.current_era)) === 0) return // checks if first loaded era
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

console.log(window.location)

let url = electron_env ? path.resolve( os.homedir(), 'Documents/self-portrait' ) + '/' : window.location.href

// if (electron_env && url.charAt(url.length-1) === '/') url = url.slice(0,-1)

// console.log(url)
//
// if (url.toString().charAt(url.length-1) === '/') {
//   url = url.slice(0, url.length-1)
// }

// if (url[-1])

// this gets the era json file, MAIN function
api('GET', url + 'songs/eras.json').then(response => {
  response.reverse()
  // globals.latest_era = response[0].era
  // globals.eras = response
  globals.eras = []
  globals.eras = response.filter(x => !x.omit) // filters out omitted eras
  globals.latest_era = globals.eras[0].era

  if (globals.eras.length === 1) domStuff.hideEraSprites()

  globals.current_era = globals.latest_era
  $('#gobackintime .readout').innerHTML = globals.current_era
  updateSongList(globals.current_era, 'onpageload')
  updateEra(globals.current_era)

  $('#contents-heading').classList.remove('hidden')

  // transitions.fadeInAll()
  transitions.loaded()
  console.log(globals)
})


$('#note-toggle') && $('#note-toggle').addEventListener('click', () => {
  let note_toggle = $('#note-toggle')
  note_toggle.classList.toggle('on')
  note_toggle.parentNode.classList.toggle('notes-visible')
  // if (note_toggle.classList.contains('on')) {
  //   note_toggle.classList.remove('on')
  // } else {
  //   note_toggle.classList.add('on')
  // }
})

$('#player').addEventListener('click', () => {
  let audio = $('audio')
  if (!(audio.duration > 0)) { // nothing loaded!
    let era = globals.eras.find(a => a.era === globals.era)
    console.log('nothing loaded! play:',era.songlist[0])
    let first_song = era.songlist[0]
    console.log(globals.loaded_songs)
    let song = globals.loaded_songs.find(a => a.song === first_song)
    searchValueAhead('file', 0, song)
    audioStuff.loadSong(song)
    $('audio').play()
    domStuff.updatePlayState($('audio'))
  } else {
    audio.paused ? audio.play() : audio.pause()
    domStuff.updatePlayState(audio)
  }

})

const songEnd = () => {
  let audio = $('audio')
  let era = globals.eras.find(x => x.era === globals.era)
  let track_no = era.songlist.indexOf(audio.song)

  let end_of_playlist = track_no < era.songlist.length - 1
  // if track is last in playlist, then end, if not then play next
  let next_song = era.songlist[end_of_playlist ? track_no + 1 : 0]
  let found_song = globals.loaded_songs.find(a => a.song === next_song)

  $('.current-lyric').classList.remove('current-lyric')

  audioStuff.loadSong(found_song)
  if (end_of_playlist) {
    $('audio').play()
  } else {

  }

  domStuff.updateTrackTitle(found_song.data.extended_title || found_song.data.title)
}

$('audio').addEventListener('ended', songEnd)

$('#img-header').addEventListener('click', () => {
  domStuff.checkForHighlightedLyric()
  let found_song = globals.loaded_songs.find(a => a.song === 'wear_life')
  audioStuff.loadSong(found_song)
  $('audio').play()
  domStuff.updatePlayState($('audio'))
  domStuff.updateTrackTitle(found_song.data.extended_title || found_song.data.title)
})

// $('#songend').addEventListener('click', songEnd)

// this highlights lyrics
const update = () => {
  if (!$('audio').paused) {
    let slug = $('audio').song
    let song = globals.loaded_songs.find(a => a.song === slug)
    let i = 0
    let predelay = 0.2 // in seconds, brings track highlight more in time
    if (song.data.timestamps) {
      while ((i < song.data.timestamps.length)
        && (convertTimestamp(song.data.timestamps[i]) < ($('audio').currentTime + predelay))
        || (song.data.timestamps[i] === '')
      ) {
        i++
      }
    } // scrolls through lines and finds right one

    let lyric_cont = $('.songform.' + slug + ' .lyrics')
    //
    if (lyric_cont.children[i-1]) { // checks existence of dom line
      if (lyric_cont.children[i-1].textContent === '') i--
      lyric_cont.children[i-1].classList.add('current-lyric')
    }
    while (i > 1) {
      i--
      lyric_cont.children[i-1].classList.remove('current-lyric')
    }
  }
}

let timer = setInterval(update, 100)
