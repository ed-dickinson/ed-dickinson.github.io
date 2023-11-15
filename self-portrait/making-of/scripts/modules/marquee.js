const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const newElement = (type, parent, clss, content) => {
  let element = document.createElement(type)
  parent.appendChild(element)
  if (clss) element.classList.add(clss)
  element.textContent = content || ''
  return element
}

const marqueeMaker = (element) => {

  let target = element ? element : document

  target.addEventListener('mousedown', () => {
    // if (event.target.classList.contains('song')) event.preventDefault()
    const checkAndSelect = () => {
        let x = 0, y = 0, w = c.clientWidth, h = c.clientHeight //or offset Width?
        let el = c
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          x += el.offsetLeft - el.scrollLeft;
          y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
        }

    }
    let tm = newElement('div', target, 'temp-marquee')
    tm.style.left = event.layerX + 'px'
    tm.style.top = event.layerY + 'px'
    tm.style.border = `1px dashed grey`
    tm.style.position = 'absolute'
    let xy = [event.x, event.y, event.layerX, event.layerY]
    let xywh = [event.x,event.y,0,0]
    const mouseMove = () => {
      if (event.x >= xy[0]) { // backwards
        tm.style.width = event.x - xy[0] + 'px'
        // xywh[2] = xy[0] - event.x
      } else {
        tm.style.width = xy[0] - event.x + 'px'
        tm.style.left = xy[2] - (xy[0] - event.x) + 'px'
        // xywh[2] = event.x - xy[0]
      }
      if (event.y >= xy[1]) {
        tm.style.height = event.y - xy[1]  + 'px'
      } else {
        tm.style.height = xy[1] - event.y + 'px'
        tm.style.top = xy[3] - (xy[1] - event.y) + 'px'
      }
    }
    const mouseUp = () => {
      target.removeChild(tm)
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)

      if (event.x > xywh[0]) {
        xywh[2] = event.x - xywh[0]
      } else {
        xywh[2] = xywh[0] - event.x
        xywh[0] = event.x
      }
      if (event.y > xywh[1]) {
        xywh[3] = event.y - xywh[1]
      } else {
        xywh[3] = xywh[1] - event.y
        xywh[1] = event.y
      }
      // checkAndSelect()
    }
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  })
}

export { marqueeMaker }
