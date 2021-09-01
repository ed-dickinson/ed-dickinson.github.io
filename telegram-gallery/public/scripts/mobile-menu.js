const menu_button = document.querySelector('.mobile-menu-button');
const close_menu_button = document.querySelector('.mobile-menu-close-button');
const menu = document.querySelector('menu');
const main = document.querySelector('main');

function openMenu() {
  menu.classList.add('open');
  main.classList.add('mobile-menu-open');
}

function closeMenu() {
  menu.classList.remove('open');
  main.classList.remove('mobile-menu-open');
}

menu_button.addEventListener('click', openMenu);
close_menu_button.addEventListener('click', closeMenu);
