// https://www.simplifyingtheory.com/math-in-music/
// https://incidentnormal.github.io/2014/pitch-shift-calculations/
// http://techlib.com/reference/musical_note_frequencies.htm

// doesn't always catch very early shapes - SOLVED

// NEW ISSUE! when creating shapes - sometimes shapes being triggered double, triple. 4x, 5x, etc in volume. i beleive this is because the scheduler is shcheduling them and then rescheduling them when getShapes is called by the shape creation as a new array is there?
// either a shorter look time or a doubling checker could solve it?
// i think i fixed this? by checking shape id's instead of shape obj's themselves 

let curve = 'frequency'; //filter
let slope = 'frequency'; //filter
let pitch
          // = 'linear'; //exponential
          = 'exponential';
let tuning = 'Free';



//////////
console.log('safari? -','webkitAudioContext' in window)
const audioContext = 'webkitAudioContext' in window ? new webkitAudioContext() : new AudioContext();

const SAMPLE_RATE = audioContext.sampleRate;
const timeLength = 1; // measured in seconds

const buffer = audioContext.createBuffer(
  1,
  SAMPLE_RATE * timeLength,
  SAMPLE_RATE
);

const startAudio = () => {

  unplayed = false; //remove

  const node = audioContext.createBufferSource();
  node.buffer = buffer;
  node.start(0);

  canvas.removeEventListener('click', startAudio);
}

canvas.addEventListener('click', startAudio);



const channelData = buffer.getChannelData(0);

for (let i = 0; i < buffer.length; i++) {
  channelData[i] = Math.random() * 2 - 1;
}

const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);

// const secondaryGainControl = audioContext.createGain();
// secondaryGainControl.gain.setValueAtTime(0.01, 0);


//shape colour, x, y (top left coords), w, h (bottom right coords)
// const playShape = (s, c, x, y, w, h) => {
//   const oscillator = audioContext.createOscillator();
//
//   oscillator.type = s.includes('triangle') ? 'triangle' : s.includes('circle') ? 'sine' : 'square';
//
// }

primaryGainControl.connect(audioContext.destination);
// secondaryGainControl.connect(audioContext.destination);


////////
// wavetables

const wave1 = audioContext.createPeriodicWave(celeste.real, celeste.imag)
const wave2 = audioContext.createPeriodicWave(bass.real, bass.imag)
const wave3 = audioContext.createPeriodicWave(dynaep_med.real, dynaep_med.imag)

////////


let canvas_width = canvas.offsetWidth;
let canvas_height = canvas.offsetHeight;

const loFrqLimit = 50;
const hiFrqLimit = 700;

let tempo = 60.0;
// const bpmCpontrol

const lookahead = 100.0; // how frequently to call scheduling function (in milliseconds)
const scheduleAheadTime = 0.1; // how far ahead to schedule audio (sec)


// inital time line 1px every 10 msecs

let current_note = 0;


// so what yu wanna o is have the scheduler checking every 25/50/100 msecs/pixels if anythng new has been drawn in front of it, - so check all the drawn shapes for an x reading, afor any in that block of time, schedule them using the one vairbale input for osc.start()

let schedule_time = 0;

//tuning freqency one octave above a note is given as 2 to the 1 times the note
// so 3 octaves above is 2 to the 3 times it
// and 2 fifths of an octave below would be 2 to the -2/5 times it
// use Math.pow(2, n)

let lo_pow_to_hi = 0;
while (loFrqLimit * Math.pow(2, lo_pow_to_hi) <= hiFrqLimit) {
  lo_pow_to_hi += 0.1;
}

console.log(loFrqLimit * Math.pow(2, lo_pow_to_hi - 0.1), lo_pow_to_hi)

const yToFrq = (y) => {
  let freq_range = hiFrqLimit - loFrqLimit;
  let canvas_proportion = (canvas_height - y) / canvas_height // this is between 0 and 1
  let frequency;

  if (pitch === 'linear') {

    let uncompensated_frequency = canvas_proportion * freq_range;

    frequency = uncompensated_frequency + loFrqLimit;
  } else if (pitch === 'exponential') {
    let log_proportion = lo_pow_to_hi * canvas_proportion;

    if (tuning.includes('TET')) {
      let n_tet = tuning.slice(0, -3);
      log_proportion = Math.round(log_proportion * n_tet) / n_tet;
    }

    frequency = loFrqLimit * Math.pow(2, log_proportion)
  }

  return frequency;
}

const scheduleShape = ({s, c, x, y, w, h}, time) => {
  console.log(audioContext.currentTime, ': scheduling...', c, s, time)
  let shape_length = ((w - x) / 100);

  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  // oscillator.type = s.includes('triangle') ? 'triangle' : s.includes('circle') ? 'sine' : 'square';

  // let filter = audioContext.createBiquadFilter();
  // // filter.type = 'bandpass';
  // filter.type = 'highpass';
  // filter.frequency.value = yToFrq(300);

  oscillator1.setPeriodicWave(c === 'blue' ? wave3 : c === 'red' ? wave2 : wave1);
  oscillator2.setPeriodicWave(c === 'blue' ? wave3 : c === 'red' ? wave2 : wave1);

  oscillator1.frequency.setValueAtTime(yToFrq(y), 0);
  oscillator2.frequency.setValueAtTime(yToFrq(h), 0);
  if (s === 'triangle-nw') {
    // console.log(slope)
    // if (slope === 'filter' ) {
    //   filter.frequency.setValueAtTime(yToFrq(h), time);
    //   console.log(filter.frequency.value)
    //   filter.frequency.linearRampToValueAtTime(yToFrq(y), time + shape_length)
    // } else {
    //   oscillator2.frequency.linearRampToValueAtTime(canvas_height - y, time + shape_length)
    // }
    oscillator2.frequency.linearRampToValueAtTime(yToFrq(y), time + shape_length)
  } else if (s === 'triangle-ne') {
    // oscillator2.frequency.setValueAtTime(canvas_height - y, time);
    // oscillator2.frequency.linearRampToValueAtTime(canvas_height - h, time + shape_length)
    oscillator2.frequency.setValueAtTime(yToFrq(y), time);
    oscillator2.frequency.linearRampToValueAtTime(yToFrq(h), time + shape_length)
  } else if (s === 'triangle-se') {
    // oscillator1.frequency.setValueAtTime(canvas_height - h, time);
    // oscillator1.frequency.linearRampToValueAtTime(canvas_height - y, time + shape_length)
    oscillator1.frequency.setValueAtTime(yToFrq(h), time);
    oscillator1.frequency.linearRampToValueAtTime(yToFrq(y), time + shape_length)
  } else if (s === 'triangle-sw') {
    // oscillator1.frequency.linearRampToValueAtTime(canvas_height - h, time + shape_length)
    oscillator1.frequency.linearRampToValueAtTime(yToFrq(h), time + shape_length)
  }
    else if (s === 'semicircle-n'|| s ==='semicircle-s') {

      s === 'semicircle-n' ?
    oscillator1.frequency.setValueAtTime(yToFrq(h), time) :
    oscillator2.frequency.setValueAtTime(yToFrq(y), time);

    let curve_res = (shape_length*100).toFixed(0);
    let curveArray = new Float32Array(curve_res); // change this to adjust with shape-length?
    let height = h - y;
    let width = w - x;
    let radius = width / 2;
    let segments = width / curveArray.length;

    curveArray[0] = s === 'semicircle-n' ? yToFrq(h) : yToFrq(y); //set start and end to known values
    curveArray[curveArray.length - 1] = s === 'semicircle-n' ? yToFrq(h) : yToFrq(y);

    for (let i = 1; i < curveArray.length - 1; i++) {
      let x = (segments * i) - (width / 2);
      let y2 = (radius * radius) - (x * x);
      let y = Math.sqrt(y2);
      let adjusted_y = y * ((height/radius))
      curveArray[i] = s === 'semicircle-n' ? yToFrq(h - adjusted_y) : yToFrq(y + adjusted_y);
    }

    s === 'semicircle-n' ?
    oscillator1.frequency.setValueCurveAtTime(curveArray, time, shape_length) :
    oscillator2.frequency.setValueCurveAtTime(curveArray, time, shape_length);

  } else if (s === 'semicircle-e' || s === 'semicircle-w') {

    let curve_res = (shape_length*100).toFixed(0);
    let curveArray = new Float32Array(curve_res); // change this to adjust with shape-length?
    let curveArray2 = new Float32Array(curve_res);
    let height = h - y;
    let width = w - x;
    let radius = width;
    let segments = width / curveArray.length;

    curveArray[0] = s === 'semicircle-e' ? yToFrq(y) : yToFrq(y + (height/2)); //set start and end to known values
    curveArray2[0] = yToFrq(s === 'semicircle-e' ? h : y + (height/2));
    curveArray[curveArray.length - 1] = yToFrq('semicircle-e' ? y + (height/2) : y);
    curveArray2[curveArray2.length - 1] = yToFrq('semicircle-e' ? y + (height/2) : h);

    for (let i = 1; i < curveArray.length - 1; i++) {
      let x = 'semicircle-e' ? (segments * i) : (segments * i) - width;
      let y2 = (radius * radius) - (x * x);
      let yy = Math.sqrt(y2);
      let adjusted_y = yy * ((height/2)/radius)
      curveArray[i] = yToFrq(h - (height/2) - adjusted_y)
      curveArray2[i] = yToFrq(y + (height/2) + adjusted_y)
    }

    oscillator1.frequency.setValueCurveAtTime(curveArray, time, shape_length);
    oscillator2.frequency.setValueCurveAtTime(curveArray2, time, shape_length);

  }

  // let waveShaperNode = audioContext.createWaveShaper();
  // // waveShaperNode.curve = 0;
  //
  // function makeDistortionCurve(amount) {
  //   let k = typeof amount === 'number' ? amount : 50,
  //     n_samples = 44100,
  //     curve = new Float32Array(n_samples),
  //     deg = Math.PI / 180,
  //     i = 0,
  //     x;
  //   for ( ; i < n_samples; ++i ) {
  //     x = i * 2 / n_samples - 1;
  //     curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  //   }
  //   return curve;
  // };
  //
  // waveShaperNode.curve = makeDistortionCurve(400);
  // waveShaperNode.oversample = '4x';
  //
  // oscillator1.connect(waveShaperNode)
  // oscillator2.connect(waveShaperNode)

  // const amp = audioContext.createGain();
  // amp.gain.setValueAtTime(0.01, audioContext.currentTime);
  //
  // const lfo = audioContext.createOscillator();
  // lfo.type = 'square';
  // lfo.frequency.value = yToFrq(y) * 100;
  // lfo.connect(amp.gain);
  // oscillator1.connect(amp).connect(audioContext.destination);
  // lfo.start();

  // oscillator1.connect(lfo)

  // not working?
  const clickControlGain = audioContext.createGain();
  clickControlGain.gain.setValueAtTime(0, time);
  clickControlGain.gain.linearRampToValueAtTime(0.1, time + 0.01);
  clickControlGain.gain.setValueAtTime(0.1, time + shape_length - 0.01);
  clickControlGain.gain.linearRampToValueAtTime(0, time + shape_length);
  // clickControlGain.gain.exponentialRampToValueAtTime(0.00001, time + shape_length);

  oscillator1.connect(clickControlGain);
  oscillator2.connect(clickControlGain);
  clickControlGain.connect(audioContext.destination);

  // clickControlGain.connect(oscillator1);
  // clickControlGain.connect(oscillator2);

  // oscillator1.connect(c === 'blue' ? secondaryGainControl : primaryGainControl);
  // oscillator2.connect(c === 'blue' ? secondaryGainControl : primaryGainControl);
  // filter.connect(oscillator1)
  // oscillator1.connect(primaryGainControl);
  // oscillator2.connect(primaryGainControl);
  // oscillator1.connect(filter).connect(primaryGainControl);
  // oscillator2.connect(filter).connect(primaryGainControl);
  // oscillator1.connect(filter);
  // oscillator2.connect(filter);
  // filter.connect(primaryGainControl);

  // oscillator1.connect(filter).connect(audioContext.destination);
  // oscillator2.connect(filter).connect(audioContext.destination);//.connect(audioContext.destination);

  oscillator1.start(time);
  oscillator2.start(time);

  oscillator1.stop(time + shape_length);
  oscillator2.stop(time + shape_length);

  // console.log(audioContext.currentTime, ': scheduled.', c, s, x+'-'+h+','+y+'-'+w, time)
}

let loop = 0;
let last_schedule = undefined;
let shapes_scheduled = [];
let shapes_scheduled_by_id = [];

const scheduler = () => {

  let playhead = ((audioContext.currentTime * 100) % canvas_width);

  let current_time = audioContext.currentTime;
  // while () next 100s contains notes to play, schedule them, and add to notes played this loop

  current_shapes.forEach(shape=> {
    // console.log(shapes_scheduled.indexOf(shape));
    // console.log(shapes_scheduled_by_id)
    if (
      // (shape.x > playhead && shape.x < playhead + lookahead)
      // && !shapes_scheduled.includes(shape)
      (shape.x > playhead && shape.x < playhead + lookahead)
      && !shapes_scheduled_by_id.includes(shape.id)
    ) {
      let time = ((shape.x - playhead) / 100) + current_time;
      scheduleShape(shape, time);
      shapes_scheduled.push(shape);
      shapes_scheduled_by_id.push(shape.id);
      // console.log(shape)
      // debug_dom.sched(time.toFixed(2), shape); // SCHEDULE DEBUGGING
      // debug_dom.shapeCoords(shape); // SCHEDULE DEBUGGING

    }
  })


  // debug_dom.add(playhead) // SCHEDULE DEBUGGING
  if (last_schedule > playhead) {
    loop++;
    debug_dom.reset(); // SCHEDULE DEBUGGING
    shapes_scheduled = [];
    shapes_scheduled_by_id = [];
  }



  last_schedule = playhead;

  // on end of loop, reset notes played and playhead and time
}

/// play button
const play_button = document.querySelector('#play-button');

// this is the main loop trigger !!!!!!
let schedule_interval = setInterval(scheduler, 100);

let playing = true;
let unplayed = true;

activateSound = () => {
  if (unplayed) {
    startAudio;
    unplayed = false;
  }
  else if (playing) {
    clearInterval(schedule_interval)
    // clearInterval(schedule_timeline);
    playing = false;
    play_button.innerHTML = 'Sound';
    // primaryGainControl.gain.setValueAtTime(0, audioContext.currentTime);
  } else {
    schedule_interval = setInterval(scheduler, 100);
    // schedule_timeline = setInterval(timelineFrame, 10);
    playing = true;
    play_button.innerHTML = 'Silence';
    // primaryGainControl.gain.setValueAtTime(0.05, audioContext.currentTime);
  }
}

// play_button.addEventListener('click', activateSound);



const debug_dom = (() => {
  const dom = document.querySelector('#schedule');
  const reset = () => dom.innerHTML = '';
  const add = (time) => {
    let row = document.createElement('div');
    row.classList.add('row');
    let child = document.createElement('div');
    child.classList.add('child');
    child.style.left = time + 'px';
    child.style.width = lookahead + 'px';
    dom.appendChild(row);
    row.appendChild(child);
  };
  const sched = (time, colour) => {
    let info = document.createElement('div');
    info.classList.add('schedule-info');
    info.style.left = (time*100 % canvas_width) + 'px';
    info.innerHTML = (time*100 % canvas_width).toFixed(0) + '<br>' + colour;
    dom.appendChild(info);
  }
  return {reset, add, sched}
})();

const timer_display = document.querySelector('#timer');

let load_time = new Date();



// const updateTimeDisplay = () => {
//
//   setInterval(() => {
//
//     let playhead = ((audioContext.currentTime * 100) % canvas_width).toFixed(0);
//     timer_display.innerHTML =
//
//     '<sub>' + playhead + 'O<sub> msecs <sub>thru</sub></sub> loop </sub>' + loop;
//
//   }, 90)
// }
// updateTimeDisplay()

/////////////////////////////////////////////

const timeline = document.querySelector('#time-line');

let schedule_timeline = null;
const timelineFrame = () => {
  timeline.style.left = ( (audioContext.currentTime*100) % canvas_width ) + 'px';
}
function timelineMove() {
  clearInterval(schedule_timeline);
  schedule_timeline = setInterval(timelineFrame, 10);

}
timelineMove();



const frequency_display = document.querySelector('#frequencies');


const frequencyLog = () => {
  let frequency_log = 0;
  frequency_display.innerHTML = '';
  frequency_display.style.display = displayOn ? 'block' : 'none';
  while (frequency_log < canvas_height) {

    let disp = document.createElement('div');
    // row.classList.add('row');
    disp.innerHTML = frequency_log;
    disp.innerHTML = yToFrq(frequency_log).toFixed(2);
    disp.style.top = frequency_log + 'px';
    frequency_display.appendChild(disp);
    frequency_log += 50;
  }
}
// frequencyLog();
