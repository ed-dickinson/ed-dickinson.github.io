const works = Array.from(document.querySelectorAll('.work'));

const worksContainer = document.querySelector('.post');


works.forEach(work => {

  console.log(work.children[0].children[0].src)
  let caption = document.createElement('div');
  caption.classList.add('work-caption');
  caption.innerHTML = work.children[0].children[0].alt;
  work.appendChild(caption);

  work.children[0].style.backgroundImage = 'url("' + work.children[0].children[0].src + '")';


})
