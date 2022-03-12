// const mobile = (window.innerWidth <= 500) ? true : false;
//
// if (!mobile) {


const proPic = document.querySelector('.greeter-pic');




let winY = window.innerHeight;

let greeter = document.querySelector('.greeter');
let greeter_words = document.querySelector('.main-doc');
let top_spacer = document.querySelector('.top-spacer');
let mid_spacer = document.querySelector('.mid-spacer');
let greeter_spacer = document.querySelector('.greeter-spacer');

let spacer1 = document.querySelector('.spacer1');
let spacer2 = document.querySelector('.spacer2');
let window_height = window.innerHeight;
let hundred_height = bg.clientHeight;

let little_window = window.innerWidth < 500 ? true : false;

let big_pic = (little_window ? 200 : 300);
let lil_pic = (little_window ? 100 : 150);

let testdisplay = document.querySelector('.test');
let arrow_scroller = document.querySelector('.arrow-scroller');

let mod = 0;
let scroll_ratio = 0;

let dev_link_underlined = false;

function scrollSpacer() {
  let scroll = window.pageYOffset;
  // hundred_height = bg.clientHeight;
  // testdisplay.innerHTML = scroll + ' ' + Math.round(window.innerHeight*0.45)+ ' ' + top_spacer.clientHeight;
  // mod = Math.round(window.innerHeight*0.45);

  scroll_ratio = scroll / winY


  // testdisplay.innerHTML = scroll + ' ' + mod*2 + ' ' + top_spacer.clientHeight;


  //takes the place of 300

  if (scroll_ratio > 1) {
    arrow_scroller.style.opacity = 0;
  } else {
    arrow_scroller.style.opacity = 1 - scroll_ratio;
  }

  greeter_words.style.opacity = scroll_ratio > 0.5 ? 1 : scroll_ratio * 2;
  // greeter opacity and picture

  if (scroll_ratio > 0.9 && !dev_link_underlined) {
    document.querySelector('.resume-link').classList.add('here');
    dev_link_underlined = true;
  }
  // greeter.parentNode.style.top = '-' + (scroll_ratio > 0.5 ? 0 : ((window_height / 2) - scroll)) + 'px';

  // greeter.parentNode.style.top = (scroll_ratio > 0.5 ? hundred_height - scroll : hundred_height / 2) + 'px';

  scroll < (hundred_height / 2) + 50 ? greeter.parentNode.classList.remove('caught') : greeter.parentNode.classList.add('caught');

  if (scroll_ratio < 0.2) {
    proPic.style.height = big_pic + 'px';
  } else if (scroll_ratio > 0.5) {
    proPic.style.height = lil_pic + 'px';
  } else {
    proPic.style.height = big_pic - (lil_pic * (((scroll_ratio - 0.2)*(0.5/0.3))*2)) + 'px';
  }

  // if (scroll_ratio > 0.5) {
  //   spacer1.style.height = window_height + 'px';
  //   spacer2.style.height = 0 + 'px';
  // } else {
  //   spacer1.style.height = (window_height * 0.5) + scroll + 'px';
  //   spacer2.style.height = (window_height * 0.5) - scroll + 'px';
  // }

  // console.log(spacer1.clientHeight)


  // spacer2.style.height =

  // let adaptive_spacer = Math.round(winY*0.45);

  // // if (scroll < mod*2) // above pro pic
  // top_spacer.style.height = (scroll > mod*2+250)
  //   ? '100px' : mod*2+250 - window.pageYOffset + 'px';
  //
  //   // between pro pic and first Wordpress
  // mid_spacer.style.height = (scroll > mod+300)
  //   ? '0px' : mod+300 - window.pageYOffset + 'px';
  //
  // greeter_spacer.style.height = (scroll > (mod*2)+650)
  //   ? '16px' : mod*2+650 - window.pageYOffset + 'px'; //adjust the 650s to make room for greeter words


  // document.querySelector('.greeter-footer').style.bottom = (scroll < (mod*2)+550) ? '-100px' : window.pageYOffset - 50 - (mod*2+550)  + 'px';


  // greeter.style.top = (winY/2) + (350-scroll) + 'px';


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

// Test via a getter in the options object to see if the passive property is accessed
let supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}

window.addEventListener('scroll', scrollSpacer, supportsPassive ? {passive: true} : false);
window.addEventListener('load', () => {
  scrollSpacer();
});
