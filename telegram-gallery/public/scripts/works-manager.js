const works = Array.from(document.querySelectorAll('.work'));

const worksContainer = document.querySelector('.works-container');
// let row = undefined;

let lightBoxI = undefined;

function openWorksLightbox() {
  if (!worksContainer.classList.contains('lightbox')) {
    worksContainer.classList.add('lightbox');
  } else {
    // worksContainer.classList.remove('lightbox');

  }

  works.forEach(work => {
    if (work == event.target.parentNode || work == event.srcElement.parentNode) {

      work.classList.add('lightbox-subject');
      i = works.indexOf(work);
    } else if (work.classList.contains('lightbox-subject')) {
      work.classList.remove('lightbox-subject')
    }
    work.addEventListener('click', lightboxNext);
  })

  updateLightboxButtons();

}

function closeLightbox() {
  worksContainer.classList.remove('lightbox');
}

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

  work.addEventListener('click', openWorksLightbox);


})

function updateLightboxButtons() {
  if (i == 0) {
    lightbox_back.classList.add('greyed');
  } else if (lightbox_back.classList.contains('greyed')) {
    lightbox_back.classList.remove('greyed');
  }
  if (i == works.length -1) {
    lightbox_next.classList.add('greyed');
  } else if (lightbox_next.classList.contains('greyed')) {
    lightbox_next.classList.remove('greyed');
  }
}

function closeAndOpen(close, open) {console.log(close, open)
  close.classList.remove('lightbox-subject');
  open.classList.add('lightbox-subject');

}

function lightboxNext() {
  if (i != works.length-1) {

    closeAndOpen(works[i],works[i+1]);
    i++;
    updateLightboxButtons();
  }

}

function lightboxBack() {
  if (i != 0) {
    closeAndOpen(works[i],works[i-1]);
    i--;
    updateLightboxButtons();
  }


}

document.querySelector('.lightbox-button.lb-exit').addEventListener('click', closeLightbox);

const lightbox_next = document.querySelector('.lightbox-button.lb-next');
lightbox_next.addEventListener('click', lightboxNext);

const lightbox_back = document.querySelector('.lightbox-button.lb-back');
lightbox_back.addEventListener('click', lightboxBack);
