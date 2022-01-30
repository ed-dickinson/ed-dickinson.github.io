//////////////////////////////////////////////////////////////
//OPTIONS

let optionsOpen = true;
const options_box = document.querySelector('#options');
let displayOn = true;
let headingOn = true;
const heading_title = document.querySelector('h1#main-title');

const openOptions = (e) => {
  switch (e.code) {
    case 'KeyO':
      optionsOpen ? options_box.style.display = 'none' : options_box.style.display = 'block';
      optionsOpen = !optionsOpen;
      break;
    case 'KeyD':
      // optionsOpen ? options_box.style.display = 'none' : options_box.style.display = 'block';
      displayOn = !displayOn;
      displaySwitch();
      break;
    case 'KeyH':
      heading_title.style.display = displayOn ? 'block' : 'none';
      displayOn = !displayOn;
      break;
    case 'KeyA':
      activateSound();
      activateSwitch();
      break;
    case 'KeyB':
      blankCanvasSwitch();
      break;

  }

  if (optionsOpen) {
    switch (e.code) {
      case 'KeyC':
        curve = curve === 'frequency' ? 'filter' : 'frequency';
        document.querySelectorAll('#options .curve .option').forEach(option => {
          option.classList.toggle('selected');
        })
        break;
      case 'KeyS':
        slope = slope === 'frequency' ? 'filter' : 'frequency';
        document.querySelectorAll('#options .slope .option').forEach(option => {
          option.classList.toggle('selected');
        })
        break;
      case 'KeyP':
        switchOption(pitch);
        break;
      case 'KeyT':
        let tuning_index;
        tuning_options.forEach(option => {
          if (tuning === option.innerHTML) {
            tuning_index = Array.from(tuning_options).indexOf(option);
          }
        })
        tuning_index === tuning_options.length - 1 ? tuning_index = 0 : tuning_index++;
        tuning = tuning_options[tuning_index].innerHTML;
        tuning_options.forEach(option => {
          option.classList.remove('selected')
        })
        tuning_options[tuning_index].classList.add('selected')
        break;
    }
  }

  if (blank_canvas_2nd_stage_active) {
    if (e.code === 'KeyY' || e.code === 'Enter') {clearShapes(); blankCanvasSwitch();}
    else if (e.code === 'KeyN') {blankCanvasSwitch();}
  }
}

const switchOption = (option) => {
  if (option === pitch) {
    pitch = pitch === 'linear' ? 'exponential' : 'linear';
    let options = document.querySelectorAll('#options .pitch .option');
    if (pitch === 'linear') {
      options[1].classList.remove('selected');
      options[0].classList.add('selected');
    } else {
      options[0].classList.remove('selected');
      options[1].classList.add('selected');
    }
  }
}

// const cycleOption = (option, options) => {
//   option = option === 'frequency' ? 'filter' : 'frequency';
//   options.forEach(x => {
//     x.classList.remove('selected');
//     if (x.innerHTML === option) {}
//   })
//   return option
// }

document.addEventListener('keydown', openOptions);

let curve = 'frequency'; //filter
let slope = 'frequency'; //filter
let pitch
          // = 'linear'; //exponential
          = 'exponential';
let tuning = 'Free';

const curve_options = document.querySelectorAll('#options .curve .option');
const slope_options = document.querySelectorAll('#options .slope .option');
[curve_options, slope_options].forEach(options => {
  options.forEach(dom => {
    dom.addEventListener('click', () => {
      options[0].parentNode.classList.contains('curve')
        ? curve : slope = dom.innerHTML.toLowerCase();
      options.forEach(option => {
        option.classList.remove('selected')
      })
      dom.classList.add('selected')
    })
  })
})

const pitch_linear = document.querySelector('#options .pitch .linear');
pitch_linear.addEventListener('click', () => {
  pitch = 'linear';
  pitch_exponential.classList.remove('selected');
  pitch_linear.classList.add('selected');
  frequencyLog();
});
const pitch_exponential = document.querySelector('#options .pitch .exponential');
pitch_exponential.addEventListener('click', () => {
  pitch = 'exponential';
  pitch_linear.classList.remove('selected');
  pitch_exponential.classList.add('selected');
  frequencyLog();
});

let tuning_options = document.querySelectorAll('#options .tuning .option');
tuning_options.forEach(dom => {
  dom.addEventListener('click', ()=>{
    tuning = dom.innerHTML;
    tuning_options.forEach(option => {
      option.classList.remove('selected')
    })
    dom.classList.add('selected');
  })
})

let display_options = document.querySelectorAll('#options .display .option');
const displaySwitch = () => {
  // frequency_display.style.display = displayOn ? 'block' : 'none';
  // timer_display.style.display = displayOn ? 'block' : 'none';
  // document.querySelector('#function-buttons').style.display = displayOn ? 'block' : 'none';
  // play_button.style.display = displayOn ? 'block' : 'none';

  [frequency_display, timer_display, play_button, document.querySelector('#function-buttons')].forEach(element => {
    element.style.display = displayOn ? 'block' : 'none';
  })

  display_options.forEach(option => {
    option.classList.remove('selected')
    if (displayOn && option.innerHTML === 'On') {option.classList.add('selected')}
    else if (!displayOn && option.innerHTML === 'Off') {option.classList.add('selected')}
  })
  heading_title.style.left = displayOn ? '50px' : '0px';
  options_box.style.left = displayOn ? '50px' : '0px';
}
display_options.forEach(dom => {
  dom.addEventListener('click', ()=>{
    displayOn = dom.innerHTML === 'On' ? true : false;
    displaySwitch();
  })
})

let activate_options = document.querySelectorAll('#options .activate .option');
const activateSwitch = () => {
  activateSound();
  activate_options.forEach(dom => {
    dom.classList.remove('selected');
  })
  playing ? activate_options[0].classList.add('selected') : activate_options[1].classList.add('selected');

}
activate_options.forEach(dom => {
  dom.addEventListener('click', activateSwitch);
})

const blank_canvas_2nd_stage = document.querySelector('#options .blank-canvas .second-stage');
const blank_canvas_button = document.querySelector('.blank-canvas > .slash');
let blank_canvas_2nd_stage_active = false;
const blankCanvasSwitch = () => {
  blank_canvas_2nd_stage_active = !blank_canvas_2nd_stage_active;
  blank_canvas_2nd_stage.style.display = blank_canvas_2nd_stage_active ? 'inline' : 'none';
  blank_canvas_button.classList.toggle('slash');
}
blank_canvas_button.addEventListener('click', blankCanvasSwitch);
document.querySelectorAll('#options .blank-canvas .second-stage .option').forEach(dom => {
  dom.addEventListener('click', () => {
    if (dom.innerHTML === 'Yes') {clearShapes();}
    blankCanvasSwitch();
  })
})
