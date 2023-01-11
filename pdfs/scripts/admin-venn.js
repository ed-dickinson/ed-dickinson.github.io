// Make the DIV element draggable:
// dragElement(document.getElementById("mydiv"));

let stylesheet_array = []

const logStylesheet = () => {
  stylesheet_log = ''

  stylesheet_array.forEach(item => {
    stylesheet_log += item + '\n'
  })



  navigator.clipboard.writeText(stylesheet_log)
  console.log(stylesheet_log)
  console.log('copied')
}

const populateStylesheetLog = () => {
  let links = document.querySelectorAll('#links a')

  let i = 0
  links.forEach(link => {
    let percent_y = (link.offsetTop / link.parentNode.parentNode.offsetHeight * 100).toFixed(2)
    let percent_x = (link.offsetLeft / link.parentNode.parentNode.offsetWidth * 100).toFixed(2)

    stylesheet_array[i] = `#links a:nth-of-type(${i+1}) {
      top: ${percent_y}%; left: ${percent_x}%;
    }`
    i++
  })
  console.log(stylesheet_array)
}
populateStylesheetLog()

document.querySelectorAll('#venn a').forEach(link => {

  link.addEventListener('click', () => {
    event.preventDefault()
  })
  dragElement(link)
})

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;


  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";


  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;

    let newX = (elmnt.offsetLeft - pos1)
    let newY = (elmnt.offsetTop - pos2)

    let percent_y = (elmnt.offsetTop / elmnt.parentNode.parentNode.offsetHeight * 100).toFixed(2)
    let percent_x = (elmnt.offsetLeft / elmnt.parentNode.parentNode.offsetWidth * 100).toFixed(2)

    let elmnt_no = Array.from(elmnt.parentNode.children).indexOf(elmnt)

    stylesheet_array[elmnt_no] = `#links a:nth-of-type(${elmnt_no+1}) {
      top: ${percent_y}%; left: ${percent_x}%;
    }`

    logStylesheet()
  }
}
