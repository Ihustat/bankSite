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

//tabs

const tabsContainer = document.querySelector('.operations__tab-container'),
      tabs = document.querySelectorAll('.operations__tab'),
      tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', (e) => {
  e.preventDefault();

  const target = e.target;

  if (target && target.classList.contains('operations__tab')) {

    tabsContent.forEach(content => {
      content.classList.remove('operations__content--active');
    });

    tabs.forEach((tab, i) => {
      tab.classList.remove('operations__tab--active');

      if (tab === target) {
        tab.classList.add('operations__tab--active');
        tabsContent[i].classList.add('operations__content--active');
        };   
        
    });
  };
});

//hover animation on nav

const navLinksContainer = document.querySelector('.nav__links'),
      navLinks = document.querySelectorAll('.nav__link');

navLinksContainer.addEventListener('mouseover', (e) => {
  const target = e.target;

  if (target && target.classList.contains('nav__link')) {
    navLinks.forEach(link => {
      link.style.opacity = 0.5;

      if (link === target) link.style.opacity = 1;
    });
  };
});

navLinksContainer.addEventListener('mouseout', () => {
  navLinks.forEach(link => link.style.opacity = 1);
});

//sticky nav

const header = document.querySelector('.header');

const headerObserverCallback = function(entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  };
};

const headerObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-100px'
};

const headerObserver = new IntersectionObserver(headerObserverCallback, headerObserverOptions);
headerObserver.observe(header);
