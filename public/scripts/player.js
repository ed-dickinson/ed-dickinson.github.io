const $ = sel => document.querySelector(sel)
const $$ = sel => document.querySelectorAll(sel)
const el = (ty, id, cl, co) => {
  let element = document.createElement(ty)
  if (id) element.id = id
  if (cl) element.classList.add(cl)
  if (co) element.textContent = co
  return element
}

let dom = {
  player : $('#player'),
  progress_bar : $('#progress-bar'),
  tracklist : $('#tracklist')
}

let customConstruct = () => {
  let container = $('#custom-player')
  dom.play_button = el('span', 'play-button')
  container.appendChild(dom.play_button)
  dom.progress_bar = el('span', 'progress-bar')
  container.appendChild(dom.progress_bar)
  Array.from([
    // "progress-bar-notches",
    "progress-bar-played",
    "progress-bar-marker",

    "progress-bar-hover"]).forEach(a => {
      dom.progress_bar.appendChild(el('span', a))
    })
  let time_container = el('span', 'time')
  container.appendChild(time_container)
  time_container.appendChild(el('span', 'current-time', null, '0:00'))
  time_container.innerHTML += '/'
  container.appendChild(time_container)
  time_container.appendChild(el('span', 'duration', null, '0:00'))
}
customConstruct()
dom.progress_bar_marker = $('#progress-bar-marker')
dom.progress_bar_hover = $('#progress-bar-hover')
dom.progress_bar_played = $('#progress-bar-played')
// dom.progress_bar_hover_marker = $('#progress-bar-hover-marker')
// dom.progress_bar_notches = $('#progress-bar-notches')
dom.current_time = $('#current-time')
dom.duration = $('#duration')

let domFuncs = {

  switchPlayPauseIcon : (p) => {
    if (p === 'play') {
      $("#play-button").classList.add("playing")
    } else {
      $("#play-button").classList.remove("playing")
    }
  } ,

  trackIndicator : (i) => {
    let old = $('.track-title.playing')
    if (old) old.classList.remove('playing')
    dom.tracklist.children[i].classList.add('playing')
    // emoji
    // let emoji = dom.tracklist.children[i].querySelector('.emoji')
    // $('#emoji-head').textContent = emoji.textContent
  }
}

let secInterval, barInterval

const playAudio = () => {
  updateTime() // update seconds quickly
  secInterval = setInterval(updateTime, 1000)
  barInterval = setInterval(updateProgressBar, 100)
}
const pauseAudio = () => {
  clearInterval(secInterval)
  clearInterval(barInterval)
}

const playPause = () => {
  if (!audio.paused) {
    audio.pause()
    domFuncs.switchPlayPauseIcon('pause')
    pauseAudio()
    // $('link[rel="icon"]').setAttribute('href', "assets/cd-emoji.png")
  } else {
    audio.play()
    domFuncs.switchPlayPauseIcon('play')
    playAudio()
    // $('link[rel="icon"]').setAttribute('href', "assets/cd-emoji.gif")
  }

}



let track_no


const updateProgressBar = () => {
  let progress = (audio.currentTime / audio.duration) * 100
  dom.progress_bar_marker.style.left = progress + '%'
  dom.progress_bar_played.style.width = progress + '%'
}



let audio = $('audio')

const convertToMins = (s) => {
  let mins = Math.floor(s / 60)
  let secs = Math.round(s % 60)
  if (secs < 10) {secs = '0' + secs}
  if (isNaN(mins)) {
    return '#:##'
  }
  return mins + ':' + secs
}

const updateTime = () => {
  dom.current_time.textContent = convertToMins(audio.currentTime)
}
const updateDuration = () => {
  dom.duration.textContent = convertToMins(audio.duration)
  // domFuncs.updateProgressNotches(audio.duration)
}

audio.controls = false
// audio.addEventListener("loadstart", updateDuration, false)

audio.onloadstart = function() {
    console.log("onloadstart");
};

// some kind of fallback for failed load
audio.onloadeddata = () => {
  console.log('onloadeddata')
  updateDuration()
  // domFuncs.updateProgressNotches(audio.duration)
}

audio.addEventListener("canplay", ()=>{
  console.log('canplay')
}, false)

updateDuration()


// TRACK NEXTER
audio.addEventListener("ended", ()=>{

  if (track_no === dom.tracklist.length - 1) {
    // last track - ended
  } else {
    track_no++
    audio.src = '../songs/mp3s/' + dom.tracklist.children[track_no].getAttribute('song') + '.mp3'
    playPause()
    domFuncs.trackIndicator(track_no)
  }
  dom.tracklist.children[track_no + 1]
}, false)

dom.play_button.addEventListener('click', playPause)

let firstPlay = () => {
  track_no = 0
  domFuncs.trackIndicator(0)
  dom.play_button.removeEventListener('click', firstPlay)
}
dom.play_button.addEventListener('click', firstPlay)



const seek = () => {
  let width = dom.progress_bar.offsetWidth
  let click = event.layerX - 2
  audio.currentTime = audio.duration * (click / width)
}
dom.progress_bar_hover.addEventListener('mousedown', () => {
  seek()
  dom.progress_bar_hover.addEventListener('mousemove', seek)
})
dom.progress_bar_hover.addEventListener('mouseup', () => {
  // seek()
  dom.progress_bar_hover.removeEventListener('mousemove', seek)
})

// add click event for each track
for (let i = 0; i < dom.tracklist.children.length; i++) {
  let element = dom.tracklist.children[i]

  let song_code = element.attributes.song.textContent

  element.addEventListener('click', () => {
    // do nothing if click on emoji
    if (event.target.className === 'emoji') return

    console.log(i, song_code, element)
    audio.src = '../songs/mp3s/' + song_code + '.mp3'
    track_no = i
    playPause()
    domFuncs.trackIndicator(i)
  })

  if (i === 0) {
    audio.src = '../songs/mp3s/' + song_code + '.mp3'
  }
}
