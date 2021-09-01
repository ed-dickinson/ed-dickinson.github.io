window.addEventListener('scroll', function() {

  const spinners = document.querySelectorAll('.telegram-square');

  spinners.forEach(spinner => {

    let i = Array.from(spinners).indexOf(spinner);

    let factor = 10;
    if (i < 2) {factor *= -1;}
    let rotation = i * 45 + (window.pageYOffset/factor);

    spinner.style.transform = 'rotate(' + rotation  + 'deg)';

  })
});
