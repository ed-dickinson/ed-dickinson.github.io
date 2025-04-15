const $ = (x) => {return document.querySelector(x)}
const $$ = (x) => {return document.querySelectorAll(x)}
const el = (type, id, clss, content) => {
  let x = document.createElement(type)
  if (id) {x.id = id}
  if (clss) {x.classList.add(clss)}
  x.textContent = content
  return x
}

$$('.distance').forEach(d => {
  d.textContent = Math.floor(Number(d.textContent.slice(0,-2)) * 6.21) / 10 + 'mi'

})

let contents = $('#contents')

let poem_doms = []

$$('.poem').forEach(p => {
  if (p.previousElementSibling && p.previousElementSibling.tagName === 'HR') {
    let space = el('div')
    contents.appendChild(space)
    space.textContent = '-'
    space.style.color = 'white'
  }

  let title = el('div')
  contents.appendChild(title)
  let content = p.children[0].textContent

  //remove comma
  if (content.charAt(content.length-1) === ',') {
    content = content.slice(0, -1)
  }

  title.textContent = content

  title.addEventListener('click', () => {
    p.scrollIntoView({ behavior: "smooth", block: "start"})
    if (window.screen.width <= 600) {
      $('body').classList.toggle('contents-open')
    }

  })

  poem_doms.push({
    contents : title ,
    poems : p
  })

  // actual poem actions
  if (p.nextElementSibling) {
    let divider = el('div', null, 'poem-divider', '* * *')
    p.insertAdjacentElement('afterend', divider)
  }

})


$('#contents-opener').addEventListener('click', () => {
  $('body').classList.toggle('contents-open')
})
$('#contents-closer').addEventListener('click', () => {
  $('body').classList.toggle('contents-open')
})



// console.log(poem_doms)


let lastKnownScrollPosition = 0;
let ticking = false;
let last_i

function doSomething(scrollPos) {
  // Do something with the scroll position
  let i = 0
  while (i === 0 || scrollPos + 50 > poem_doms[i].poems.offsetTop) {
    i++
    if (i === poem_doms.length) break
  }
  i--
  last_i = i
  if (poem_doms[i].contents === $('#contents .current')) {

  } else {
    if ($('#contents .current')) {
      $('#contents .current').classList.remove('current')
    }
    poem_doms[i].contents.classList.add('current')
  }


}

document.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});

let findInView = (w) => {
  let i = 0

  while (i < $$('.poem').length) {
    let poem = $$('.poem')[i]
    if (poem.offsetTop + poem.offsetParent.offsetTop > w) {
      console.log(poem.children[0].textContent, i, $$('.poem').length)
      return poem
      break
    }
    i++
  }

}

let font_size = 1;
let fontSizeChanger = (i) => {
  font_size += i

  let last_scroll = window.scrollY
  let el_in_view = findInView(window.scrollY)

  let last_el = (el_in_view) ? (el_in_view.offsetTop + el_in_view.offsetParent.offsetTop) : undefined

  // change font size
  $('#poems').style.fontSize = font_size + 'em'
  //

  if (window.scrollY === 0) {
    scrollTo(0, 0)
  } else if (last_el) {
    let new_el = el_in_view.offsetTop + el_in_view.offsetParent.offsetTop

    let change = new_el - last_el

    let new_scroll = last_scroll + change
    scrollTo(0, new_scroll)
  } else {
    // / if last then scroll to very end
    scrollTo(0, 99999)
  }

}

$('#font-size-inc').addEventListener('click', () => {
  fontSizeChanger(0.1)
})
$('#font-size-dec').addEventListener('click', () => {
  fontSizeChanger(-0.1)
})
