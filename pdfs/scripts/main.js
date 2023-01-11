document.querySelectorAll('.folder').forEach(folder=>{
  folder.addEventListener('click',()=>{
    folder.classList.toggle('collapsed')
  })
})
