let title = 'Ed Dickinson'

let dom = {
  title : document.querySelector('#main-title')
}

const unselectAllArticles = () => {
  document.querySelector('.selected').classList.remove('selected')
}

const setUpButton = (button, target, name) => {

  button.addEventListener('click', () => {
    title = name === 'Home' ? 'Ed Dickinson' : name
    document.querySelector('article.selected').classList.remove('selected')
    document.querySelector(target).classList.add('selected')
  })
  button.addEventListener('mouseenter', () => {
    dom.title.textContent = name
  })
  document.querySelector('menu').addEventListener('mouseleave', () => {
    dom.title.textContent = title
  })
}

setUpButton(document.querySelector('button#home-link'), '#about', 'Home')
setUpButton(document.querySelector('button#laptop'), '#projects', 'Projects')
setUpButton(document.querySelector('button#spanner'), '#tools', 'Tools')

document.querySelector('#read-more').addEventListener('click', () => {
  document.querySelector('#extra-text').classList.add('expanded')
})
