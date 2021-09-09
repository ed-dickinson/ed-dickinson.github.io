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

/* hover over */

  let tech_info = document.querySelector('.info-box');
  function mouseOver()
  {
      if (tech_info.style.display != 'block') {
        tech_info.style.display = 'block';
      }
      var e = window.event;

      var posX = e.clientX;
      var posY = e.clientY;

      tech_info.style.top = e.clientY + 8 + 'px';
      tech_info.style.left = e.clientX + 16 + 'px';
      if (tech_info.innerHTML != event.target.name) {
        tech_info.innerHTML = event.target.name;
      }

  }

  let techs =  document.querySelectorAll('.technologies img');
  techs.forEach(tech=>{
    tech.addEventListener('mousemove',mouseOver);
    tech.addEventListener('mouseout',()=>{
      tech_info.style.display = 'none';
    });
  });
