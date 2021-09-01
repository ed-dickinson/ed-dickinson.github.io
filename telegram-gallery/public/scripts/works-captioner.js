const works = Array.from(document.querySelectorAll('.work'));

const worksContainer = document.querySelector('.post');


works.forEach(work => {
  // let i = works.indexOf(work);
  // let odd = (i%2==1);
  //
  // if (!odd) {
  //   row = document.createElement('div');
  //   row.classList.add('works-row');
  // }

  let caption = document.createElement('div');
  caption.classList.add('work-caption');
  caption.innerHTML = work.children[0].alt;
  work.appendChild(caption);



})
