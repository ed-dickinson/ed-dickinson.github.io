const canvas = document.querySelector('#canvas');

let rendered_shapes = [];

// const shapes = [{name: 'circle', path:name: 'square'}]
const shapes = ['semicircle-n','semicircle-e','semicircle-s','semicircle-w','square','triangle-sw','triangle-nw','triangle-ne','triangle-se']
const colours = ['blue','red','yellow']
let colours_i = 0;

const initial_size = 20;

const cloner = document.querySelector('#cloner .shape')

const Shape = (x, y, w, h, colour, shape) => {


  // let shape = 'square';
  // let colour = colours[colours_i];
  // colours_i === colours.length - 1 ? colours_i = 0 : colours_i++;

  let clone = cloner.cloneNode(true);

  // let w = 0, h = 0;

  clone.style.left = x + 'px';
  clone.style.top = y + 'px';
  clone.style.width = w - x + 'px';
  clone.style.height = h - y + 'px';

  clone.classList.remove('blue');
  clone.classList.add(colour);

  clone.classList.remove('square');
  clone.classList.add(shape);

  canvas.appendChild(clone);
  // must be rendered to have size

  let target = undefined;
  let click_hold = undefined;

  let click_hold_timer;
  clone.addEventListener('mousedown', ()=>{
    target = event.path[0].nodeName === "svg" ? event.path[0] : event.path[1]; //nodeName or tagName
    click_hold = false;
    clearTimeout(click_hold_timer)
    click_hold_timer = setTimeout(()=>{click_hold = true; clone.style.cursor = 'alias';},300)

    mousedown = {x: event.x, y: event.y};
    let m = 20;
    // if (event.x > w - m && event.y > h - m) {
    if (resizing === 'se') {
      clearTimeout(click_hold_timer)
      canvas.addEventListener('mousemove', resizeSE);
      canvas.addEventListener('mouseup', resizeSEDone);
    } else if (resizing === 'sw') {
      clearTimeout(click_hold_timer);
      canvas.addEventListener('mousemove', resizeSW);
      canvas.addEventListener('mouseup', resizeSWDone);
    } else if (resizing === 'nw') {
      clearTimeout(click_hold_timer);
      canvas.addEventListener('mousemove', resizeNW);
      canvas.addEventListener('mouseup', resizeNWDone);
    } else if (resizing === 'ne') {
      clearTimeout(click_hold_timer);
      canvas.addEventListener('mousemove', resizeNE);
      canvas.addEventListener('mouseup', resizeNEDone);
    } else {
      canvas.addEventListener('mousemove', moveShape);
      canvas.addEventListener('mouseup', moveEnd);
    }

    clone.removeEventListener('mousemove', changeResizeCursor);
  })

  const moveEnd = () => {
    canvas.removeEventListener('mousemove', moveShape)
    clearTimeout(click_hold_timer);
    if (mousedown.x !== event.x || mousedown.y !== event.y) {
      x -= (mousedown.x - event.x);
      y -= (mousedown.y - event.y);
      w -= (mousedown.x - event.x);
      h -= (mousedown.y - event.y);
      clone.style.cursor = 'pointer';
    } else {
      clone.style.cursor = 'pointer';
      click_hold ? changeColour() : changeShape();
    }
    canvas.removeEventListener('mouseup', moveEnd);
    clone.addEventListener('mousemove', changeResizeCursor);
    getShapes();
  }

  const resizeSE = () => {
    clone.style.width = w - x - (mousedown.x - event.x);
    clone.style.height = h - y - (mousedown.y - event.y);
  }

  const resizeSEDone = () => {
    canvas.removeEventListener('mousemove', resizeSE);
    clone.style.cursor = 'pointer';
    w -= (mousedown.x - event.x);
    h -= (mousedown.y - event.y);
    canvas.removeEventListener('mouseup', resizeSEDone)
    clone.addEventListener('mousemove', changeResizeCursor);
    getShapes();
  }

  const resizeSW = () => {
    clone.style.left = x - (mousedown.x - event.x);
    clone.style.width = w - x + (mousedown.x - event.x);
    clone.style.height = h - y - (mousedown.y - event.y);
  }

  const resizeSWDone = () => {
    canvas.removeEventListener('mousemove', resizeSW);
    clone.style.cursor = 'pointer';
    x -= (mousedown.x - event.x);
    h -= (mousedown.y - event.y);
    canvas.removeEventListener('mouseup', resizeSWDone);
    clone.addEventListener('mousemove', changeResizeCursor);
    getShapes();
  }

  const resizeNW = () => {
    clone.style.left = x - (mousedown.x - event.x);
    clone.style.top = y - (mousedown.y - event.y);
    clone.style.width = w - x + (mousedown.x - event.x);
    clone.style.height = h - y + (mousedown.y - event.y);
  }

  const resizeNWDone = () => {
    canvas.removeEventListener('mousemove', resizeNW);
    clone.style.cursor = 'pointer';
    x -= (mousedown.x - event.x);
    y -= (mousedown.y - event.y);
    canvas.removeEventListener('mouseup', resizeNWDone);
    clone.addEventListener('mousemove', changeResizeCursor);
    getShapes();
  }

  const resizeNE = () => {
    clone.style.top = y - (mousedown.y - event.y);
    clone.style.width = w - x - (mousedown.x - event.x);
    clone.style.height = h - y + (mousedown.y - event.y);
  }

  const resizeNEDone = () => {
    canvas.removeEventListener('mousemove', resizeNE);
    clone.style.cursor = 'pointer';
    w -= (mousedown.x - event.x);
    y -= (mousedown.y - event.y);
    canvas.removeEventListener('mouseup', resizeNEDone);
    clone.addEventListener('mousemove', changeResizeCursor);
    getShapes();
  }

  let resizing;
  const changeResizeCursor = () => {
    let m = 20; // margin
    // changes resize corner hover area if shape is too small
    let vm = w - x >= 60 ? m : (w - x) / 3; // vertical margin
    let hm = h - y >= 60 ? m : (h - y) / 3; // horizontal margin
    if (event.x < x + vm && event.y < y + hm) {
      resizing = 'nw';
      clone.style.cursor = 'nw-resize';
    } else if (event.x > w - vm && event.y < y + hm) {
      resizing = 'ne';
      clone.style.cursor = 'ne-resize';
    } else if (event.x > w - vm && event.y > h - hm) {
      resizing = 'se';
      clone.style.cursor = 'se-resize';
    } else if (event.x < x + vm && event.y > h - hm) {
      resizing = 'sw';
      clone.style.cursor = 'sw-resize';
    } else {
      resizing = null;
      clone.style.cursor = 'pointer';
    }
  }
  clone.addEventListener('mousemove', changeResizeCursor);

  let dom = clone;

  const changeShape = () => {
    clone.classList.remove(shape)
    shapes.indexOf(shape) === shapes.length - 1 ? shape = shapes[0] : shape = shapes[shapes.indexOf(shape)+1];
    clone.classList.add(shape)
  }
  const changeColour = () => {
    clone.classList.remove(colour)
    colours.indexOf(colour) === colours.length - 1 ? colour = colours[0] : colour = colours[colours.indexOf(colour)+1];
    clone.classList.add(colour)
  }
  const changeSize = (xx,yy,ww,hh) => {
    w = ww;
    h = hh;
    x = xx;
    y = yy;
    clone.style.left = xx;
    clone.style.top = yy + 'px';
    clone.style.width = ww - xx + 'px';
    clone.style.height = hh - yy + 'px';
  }
  const moveShape = () => {
    // console.log('moveShape', mousedown.x, mousedown.y, '>',event.x, event.y)
    clone.style.cursor = 'move';
    clone.style.left = x - (mousedown.x - event.x);
    clone.style.top = y - (mousedown.y - event.y);
  }
  const getDetails = () => {
    return {x, y, w, h, c: colour, s: shape}
  }
  // console.log(shape)
  return {changeShape, x,y,w,h, changeSize, getDetails, dom}
}

const createShape = (x, y, w, h, colour, shape) => {
  // console.log(x, y)
  let new_shape = Shape(x, y, w, h, colour, shape);
  // new_shape.dom.addEventListener('mousedown',()=>{console.log(new_shape)})
  rendered_shapes.push(new_shape)
  getShapes(); // update
  return new_shape;
}

canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', dragSize);



  if (event.path[1].classList.contains('shape') || event.path[0].classList.contains('shape')) {
    // console.log(event)
  } else {
    // createShape(mousedown.x, mousedown.y, event.x, event.y);
    // if drag doesn't happen
    if (mousedown.x === event.x || mousedown.y === event.y) {
      selected_shape.changeSize(mousedown.x - 10,mousedown.y - 10,mousedown.x + 10,mousedown.y + 10);
    }
    // console.log(rendered_shapes)
  }

}, true)

let mousedown = {x: 0, y: 0};

let selected_shape = undefined;

const greeter = document.querySelector('.greeter');
let greeter_shown = true;

canvas.addEventListener('mousedown', () => {

  greeter.classList.add('hidden');

  // click on shape
  if (event.path[1].classList.contains('shape') || event.path[0].classList.contains('shape')) {
    // selected_shape =
    // if (mousedown.x > selected_shape)
  } else {
    mousedown = {x: event.x, y: event.y};

    selected_shape = createShape(event.x, event.y, event.x, event.y, colours[colours_i], 'square');
    //change colour on new shape
    colours_i === colours.length - 1 ? colours_i = 0 : colours_i++;
    canvas.addEventListener('mousemove', dragSize)
  }

})

// this sizes the shape on click creation
const dragSize = () => {
    let x = mousedown.x < event.x ? mousedown.x : event.x;
    let y = mousedown.y < event.y ? mousedown.y : event.y;
    let w = mousedown.x < event.x ? event.x : mousedown.x;
    let h = mousedown.y < event.y ? event.y : mousedown.y;
    selected_shape.changeSize(x,y,w,h);
}



console.log(canvas.offsetWidth, canvas.offsetHeight)



const log_button = document.querySelector('#log-button');

// log_button.addEventListener('click',()=>{
//   console.log('shapes:',getShapes())
// })

let current_shapes = [];

const getShapes = () => {
  let array_of_shapes = [];
  rendered_shapes.forEach(shape => {
    let details = shape.getDetails();
    array_of_shapes.push(details);
  })
  current_shapes = array_of_shapes;
  return array_of_shapes;
}

const load_button = document.querySelector('#load-button');

let test_shapes = [
  {x:50,y:300,w:90,h:350,s:'square',c:'yellow'},
  {x:100,y:100,w:200,h:200,s:'square',c:'blue'},
  {x:150,y:250,w:300,h:350,s:'triangle-nw',c:'red'},
  {x:250,y:300,w:350,h:400,s:'semicircle-n',c:'yellow'},
  {x:350,y:150,w:500,h:200,s:'triangle-ne',c:'yellow'},
  {x:400,y:350,w:450,h:400,s:'square',c:'blue'},
  {x:550,y:450,w:600,h:600,s:'triangle-sw',c:'yellow'},
  {x:650,y:250,w:750,h:500,s:'triangle-se',c:'red'},
];

// let test_shapes = [
//   {x:50,y:100,w:200,h:550,s:'semicircle-e',c:'yellow'},
//   {x:250,y:200,w:390,h:400,s:'semicircle-s',c:'yellow'},
//   {x:400,y:150,w:600,h:600,s:'semicircle-n',c:'blue'},
//   {x:620,y:50,w:780,h:500,s:'semicircle-w',c:'red'},
// ];

const loadTestShapes = () => {
  test_shapes.forEach(shape => {
    let new_shape = createShape(shape.x, shape.y, shape.w, shape.h, shape.c, shape.s)
    // rendered_shapes.push(new_shape);
  })
  getShapes();
}

// load_button.addEventListener('click',loadTestShapes);
loadTestShapes();

// document.querySelector('#clear-button').addEventListener('click',()=>{
//   current_shapes = [];
//   rendered_shapes = [];
//   document.querySelectorAll('#canvas svg').forEach(shape=>{
//     canvas.removeChild(shape);
//   })
// });
