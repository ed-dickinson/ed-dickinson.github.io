document.querySelectorAll('.folder').forEach(folder=>{
  folder.addEventListener('click',()=>{
    folder.classList.toggle('collapsed')
  })
})

document.querySelector('#top').style.minHeight = document.querySelector('#top').offsetHeight + 'px'
