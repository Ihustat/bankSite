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

//show sections by scroll

const sections = document.querySelectorAll('.section');

const sectionsObserverCallback = function(entries, observer) {
  const entry = entries[0];

  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');

};

const sectionsObserverOptions = {
  root: null,
  threshold: 0.1,
};

const sectionsOberver = new IntersectionObserver(sectionsObserverCallback, sectionsObserverOptions);

sections.forEach(section => {
  section.classList.add('section--hidden');

  sectionsOberver.observe(section);
});

//lazy loading

const lazyImages = document.querySelectorAll('img[data-src]');

const lazyImagesCallback = function(entries, observer) {
  const entry = entries[0];

  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
      observer.unobserve(entry.target);
  };
};

const lazyImagesOptions = {
  root: null,
  threshold: 0.5
};

const lazyImagesObserver = new IntersectionObserver(lazyImagesCallback, lazyImagesOptions);

lazyImages.forEach(img => lazyImagesObserver.observe(img));

//slider

const slides = document.querySelectorAll('.slide'),
      btnLeft = document.querySelector('.slider__btn--left'),
      btnRight = document.querySelector('.slider__btn--right'),
      dotsContainer = document.querySelector('.dots');

let currentSlide = 0;

function createDots() {
  slides.forEach((_,i) => {
    dotsContainer.insertAdjacentHTML('beforeend',
     `<button class="dots__dot" data-slide="${i}"></button>
     `);
  });
};

function activeDot(i) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });

  document.querySelector(`.dots__dot[data-slide="${i}"]`).classList.add('dots__dot--active');
};

createDots();

function moveToSlide(slide = 0) {
    slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

function nextSlide() {
  if (currentSlide === slides.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  };

  moveToSlide(currentSlide);
  activeDot(currentSlide);
};

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  };

  moveToSlide(currentSlide);
  activeDot(currentSlide);
};

moveToSlide();
activeDot(0);

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

dotsContainer.addEventListener('click', (e) => {
  const target = e.target;

  if (target && target.classList.contains('dots__dot'))  {
    const slideIndex = target.dataset.slide;

    currentSlide = slideIndex;

    moveToSlide(slideIndex);
    activeDot(slideIndex);
  };
});