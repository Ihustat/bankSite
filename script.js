'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModalWindow.length; i++)
  btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to'),
      section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', (e) => {
  //old approach

  // const section1Coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: section1Coords.left, 
  //   top:section1Coords.top + window.scrollY,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({behavior: 'smooth'});
});

//section navigation

const nav = document.querySelector('.nav');

nav.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target;

  if (target && target.classList.contains('nav__link')) {
    const targetSection = document.querySelector(`${target.getAttribute('href')}`);

    targetSection.scrollIntoView({behavior: 'smooth'});
  };
});
