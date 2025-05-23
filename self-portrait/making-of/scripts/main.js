const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

import {marqueeMaker} from '../scripts/modules/marquee.js'

// add an object tp the array to add a tooltip. w and h are the coords of x + w and y + h
let hover_spots = {
  'editor-img' : [
    {
      coords : { x : 10, y : 286, w : 833, h: 364 } ,
      name : 'Waveform Display' ,
      info : "This is a representation of the audio waveform, generated by averaging the volume of the audio signal over each tiny section of sound, and drawing a little black line who's height corresponds to that volume."
    },{
      coords : { x : 674, y : 7, w : 827, h : 67 } ,
      name : 'Era Tracker',
      info: "This tracks which era the song was first included in, and when it changed, if it has changed that is. These are represented by the &Hfr; & &hfr; symbols."
    },{
      coords : { x : 10, y : 390, w : 831, h : 503 } ,
      name : 'Verse & Line Editor',
      info: "I set up a little algorithm that turned each line of the lyrics into an input box that allowed me to edit how they were formatted."
    }
  ] ,
  'eras-img' : [
    {
      coords : { x : 112, y : 90, w : 171, h: 321 } ,
      name : 'Era Column' ,
      info : "This is a table of columns that allows me to select which songs are included in which era."
    },{
      coords : { x : 11, y : 330, w : 189, h: 348 } ,
      name : 'Song Adder' ,
      info : "This little box allows the addition of new songs to the era organiser."
    }
  ]

}

$$('figure').forEach(figure => {

  marqueeMaker(figure) // ONLY FOR SETUB DEBUG MAKE

  figure.addEventListener('mousemove', ()=> {
    let rect = event.target.getBoundingClientRect()
    let x = event.clientX - rect.left //x position within the element.
    let y = Math.floor(event.clientY - rect.top)  //y position in elem

    // get object that represents the img with id
    let obj = hover_spots[figure.querySelector('img').id]
    let display_bool = false
    obj.forEach(o => {
      if (x > o.coords.x && x < o.coords.w && y > o.coords.y && y < o.coords.h) {
        // update caption with hovered target info
        figure.querySelector('figcaption').innerHTML = o.info
        display_bool = true
      }
    })

    // if mouse is over an area with a tooltip then show it, otherwise dont
    display_bool ? figure.classList.add('show-caption') : figure.classList.remove('show-caption')

    // remove position classes
    figure.querySelector('figcaption').classList.remove('top-left')
    figure.querySelector('figcaption').classList.remove('top-right')
    figure.querySelector('figcaption').classList.remove('bottom-left')
    figure.querySelector('figcaption').classList.remove('bottom-right')

    // add new position class dependent on mouse position
    if (x <= (rect.width / 2) && y <= (rect.height / 2)) {
      figure.querySelector('figcaption').classList.add('bottom-right')
    } else if (x > (rect.width / 2) && y <= (rect.height / 2)) {
      figure.querySelector('figcaption').classList.add('bottom-left')
    } else if (x <= (rect.width / 2) && y > (rect.height / 2)) {
      figure.querySelector('figcaption').classList.add('top-right')
    } else {
      figure.querySelector('figcaption').classList.add('top-left')
    }

  })


  // this is all debug/setup stuff to find coords on click and drag
  figure.addEventListener('mousedown', () => {
    event.preventDefault()
    let rect = event.target.getBoundingClientRect()
    let x = event.clientX - rect.left //x position within the element.
    let y = Math.floor(event.clientY - rect.top)
    figure.string = `{ x : ${x}, y : ${y}, `
  })
  figure.addEventListener('mouseup', () => {
    let rect = event.target.getBoundingClientRect()
    let x = event.clientX - rect.left //x position within the element.
    let y = Math.floor(event.clientY - rect.top)
    figure.string += `w : ${x}, h : ${y} }`
    console.log(figure.string)
  })

})
