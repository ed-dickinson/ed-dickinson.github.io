let caravan_subtitles = [
  ["Whenever i get to a new place...","0:00.000"],["i stand back and drink it in,","0:04.953"],["relish the feeling of seeing...","0:09.391"],["something i have never seen.","0:13.725"],["I don't know quite what i'm looking for, \t\t","0:18.059"],["something only birds see.","0:22.496"],["An imperceptible difference,","0:26.727"],["in the patterns as they move. ","0:31.164"],["If i had a hundred eyes–","0:35.189"],["they would be pointing at something i haven't seen.","0:39.420"],["If i had a pair of wings–","0:44.063"],["i would be flying towards something that isn't there yet.","0:48.191"],["Something that i only feel...","0:52.628"],["like the silence of the morning before the light hits.","0:56.962"],["When the grass heads are still, ","1:01.503"],["and the droplets on the window pain hang weightlessly,","1:05.734"],["and then 't dawns on me it's real, ","1:10.171"],["the dull rumbling of existence that is there","1:14.711"],["whenever i close my eyes,","1:18.220"],["whenever the sun hasn't yet to rise. ","1:23.895"],["As i stand in the doorway of the world,","1:44.224"],["i look out and see the air lit by the evening light,","1:49.900"],["rays converging on a point behind the clouds,","1:54.234"],["i see they promise me and pure and unimaginable bliss.","1:57.536"],["And i feel totally at peace,","2:02.593"],["knowing that it's out there – even if i never reach it. ","2:07.236"],["Like i'm looking at a house nestled in the hillside,","2:11.674"],["so beautiful it makes me ache.","2:17.452"],["I'm just happy that someone gets to live there,","2:20.135"],["even if it's never me. ","2:26.304"],["It's like i'm plugged in to the Earth.","2:28.693"],["It's like i'm tuned in to the very sky above me. ","2:32.931"],["Whenever i close my eyes,","2:37.265"],["and forget that i even have a body.","2:41.806"],["Whenever i close my eyes, it's a blessing.","2:46.243"]
]



const convertTimestampToSecs = (input) => {
  let mins = input.split(':')
  let output = (Number(mins[0]) * 60) + Number(mins[1])
  return output
}

caravan_subtitles.forEach(val => {
  if (val[1]) {
    val[1] = convertTimestampToSecs(val[1])
  }
})

let clear_subtitle_at = caravan_subtitles[caravan_subtitles.length - 1][1] + 5


const dom = {
  container : document.querySelector('#caravan'),
  video : document.querySelector('#caravan video'),
  subs : document.querySelector('#subtitles')
}

const debug = document.querySelector('#vid-debug')



const subtitler = {
  timer : undefined,
  last : undefined,
  play : () => {
    subtitler.timer = setInterval(() => {
      let i = 0
      while (caravan_subtitles[i] && dom.video.currentTime >= caravan_subtitles[i][1]) {
        i++
      }

      if (i < 0) return // lil bug
      if (i === subtitler.last) { // if subtitle is unchanged
        if (dom.video.currentTime >= caravan_subtitles[i-1][1] + 8) {
          dom.subs.textContent = ''
        } // timeout to remove sub
        return
      } else { // triggers new subtitle
        dom.subs.textContent = caravan_subtitles[i-1][0]
      }
      subtitler.last = i
    }, 50)
  },
  pause : () => {
    clearInterval(subtitler.timer)
  }
}


dom.container.addEventListener('click', ()=>{
  if (dom.video.paused) {
    dom.video.play()
    dom.container.classList.add('playing')
    subtitler.play()
  } else {
    dom.video.pause()
    dom.container.classList.remove('playing')
    subtitler.pause()
  }
})

let space_paused

document.addEventListener('keydown', () => {
  if (event.keyCode === 32) {
    if (dom.video.paused === false) {
      dom.video.pause()
      space_paused = true
    } else if (space_paused === true) {
      dom.video.play()
      space_paused = false
    }
  }
})