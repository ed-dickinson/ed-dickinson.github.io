// SPARKLE BG

  let bg = document.querySelector('.sparkle-bg');
  let size = Math.round(window.innerHeight * window.innerWidth / 100000 * 20);
  for (let i = 0; i < size; i++) {
    let sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    bg.appendChild(sparkle);
    sparkle.style.left = Math.random()*window.innerWidth + 'px';
    sparkle.style.top = Math.random()*window.innerHeight + 'px';
    sparkle.style.animationDelay = '-' + Math.random()*10 + 's';
  }
