const Spinner = (dom, inro, romo) => {

  let offsetMod = (Math.random()<0.5) ? Math.random() : Math.random() * -1;

  // let rotatorMod = (Math.floor(Math.random()*10)/10) + 3; //inc last no to slow rot
  // let initialRotation = Math.floor(Math.random()*61) - 30;
  let initialRotation = inro;
  let rotatorMod = romo;

  dom.style.transform = 'rotate(' + initialRotation + 'deg)';
  // dom.style.left = (Math.random()<0.5) ? Math.floor(Math.random()*50) + '%' : 'calc('+ (50+Math.floor(Math.random()*50)) + '% - 120px';
  return {rotatorMod, dom,  initialRotation, offsetMod}
}

let spinners = [];

const proPic = document.querySelector('.pro-pic');

function showDescription() {

  let info = document.querySelector('[for=' + event.srcElement.name + ']');
  document.querySelectorAll('label').forEach(child => {
    if (child.classList.contains('selected')) {
      child.classList.remove('selected');
    }
  })

  document.querySelectorAll('.scroll-item-cont').forEach(child => {
    if (child.classList.contains('selected')) {
      child.classList.remove('selected');
    }
  })
  info.classList.add('selected');


  event.srcElement.parentNode.classList.add('selected');

}
let spin_mods = [//top is left
  {inro:-360,romo:2.5},{inro:100,romo:0.8},{inro:100,romo:2},
  //these are right
  {inro:500,romo:-2},
]
let spin_doms = document.querySelectorAll('.spin');
spin_doms.forEach(spinner => {
  let i = Array.from(spin_doms).indexOf(spinner);
  let spinnerNew =
  spinners.push(Spinner(spinner, spin_mods[i].inro, spin_mods[i].romo));


})
spinners.forEach(spinner => {
  spinner.dom.addEventListener('click', showDescription);
});

let winY = window.innerHeight;

let greeter = document.querySelector('.greeter');
let greeter_words = document.querySelector('.greeter-words');
let top_spacer = document.querySelector('.top-spacer');
let mid_spacer = document.querySelector('.mid-spacer');
let greeter_spacer = document.querySelector('.greeter-spacer');

let testdisplay = document.querySelector('.test');
let arrow_scroller = document.querySelector('.arrow-scroller');

let mod = 0;

function scrollSpacer() {
  let scroll = window.pageYOffset;
  // testdisplay.innerHTML = scroll + ' ' + Math.round(window.innerHeight*0.45)+ ' ' + top_spacer.clientHeight;
  mod = Math.round(window.innerHeight*0.45);

  // testdisplay.innerHTML = scroll + ' ' + mod*2 + ' ' + top_spacer.clientHeight;


  //takes the place of 300

  if (scroll < 500) {
    arrow_scroller.style.opacity = 1;
  } else if (scroll > 700) {
    arrow_scroller.style.opacity = 0;
  } else {
    arrow_scroller.style.opacity = (700-scroll)/200;
  }

  // greeter opacity and picture
  if (scroll < 200) {
    greeter_words.style.opacity = 0;
    proPic.style.height = 300 + 'px';
  } else if (scroll > mod+100) {
    greeter_words.style.opacity = 1;
    proPic.style.height = 150 + 'px';
  } else {
    greeter_words.style.opacity = (scroll-200)/200;
    proPic.style.height = mod+200 - window.pageYOffset + 'px';
  }

  let adaptive_spacer = Math.round(winY*0.45);

  // if (scroll < mod*2)
  top_spacer.style.height = (scroll > mod*2+250)
    ? '100px' : mod*2+250 - window.pageYOffset + 'px';

  mid_spacer.style.height = (scroll > mod+300)
    ? '0px' : mod+300 - window.pageYOffset + 'px';

  greeter_spacer.style.height = (scroll > (mod*2)+650)
    ? '16px' : mod*2+650 - window.pageYOffset + 'px'; //adjust the 650s to make room for greeter words


  document.querySelector('.greeter-footer').style.bottom = (scroll < (mod*2)+550) ? '-100px' : window.pageYOffset - 50 - (mod*2+550)  + 'px';


  // greeter.style.top = (winY/2) + (350-scroll) + 'px';

  spinners.forEach(spinner => {

    let rotation = spinner.initialRotation + (window.pageYOffset / spinner.rotatorMod);

    spinner.dom.style.transform = 'rotate(' + rotation/5  + 'deg)';

    // spinner.dom.style.top = (spinner.offsetMod * window.pageYOffset * 0.5) + 'px';


  })

  if (scroll > 20) {
    document.querySelectorAll('.howdy-container span').forEach(element => {
      // if (!element.classList.contains('howdy-hide')) {
        element.classList.remove('howdy-show');
        element.classList.add('howdy-hide');
      // }
    })
  } else if (scroll < 10) {
    document.querySelectorAll('.howdy-container span').forEach(element => {
      if (element.classList.contains('howdy-hide')) {

        element.classList.add('howdy-show');
        // element.classList.remove('howdy-hide');
      }
    })
  }
}
window.addEventListener('scroll', scrollSpacer);
window.addEventListener('load', () => {
  scrollSpacer();
  document.querySelector('.scroll-items.left').style.paddingTop = mod*2+750 + 'px';
  document.querySelector('.scroll-items.right').style.paddingTop = mod*2+950 + 'px';
});
