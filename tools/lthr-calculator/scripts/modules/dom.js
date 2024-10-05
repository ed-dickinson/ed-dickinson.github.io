const $ = sel => document.querySelector(sel)
const $$ = sel => document.querySelectorAll(sel)
const el = (ty, cl, co) => {
  let element = document.createElement(ty)
  element.classList.add(cl)
  if (co) {element.textContent = co}
  return element
}

const dom = {
  function : () => {
    console.log('dom.js')
  }
}

export default dom
