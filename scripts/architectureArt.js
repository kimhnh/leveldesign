'use strict';
import { projects } from './data.js';

// Insert Content
const archProjectIndex = 2;
const displayProjectIndex = 3;
const artProjectIndex = 4;
const main = document.querySelector('main');

const archArtMarkup = `
    <section class="project">
                    <div class="wrapper-arch-art">
                        <img class="" src="../assets/images/arch_consulate_cover.jpg" alt="" />
                    </div>
                    <h1 class="project-title">${projects[archProjectIndex].title}</h1>
					<p class="project-synposis project-synposis__archart">${projects[archProjectIndex].synposis}</p>
                    <div class="project-description">
						<aside class="project-description__aside aside__long" id="asideArchArt">
							<div class="project-description__item">
								<h3>파트너<span class="item-notes"> :&nbsp;${projects[archProjectIndex].team}</span></h3>
							</div>
							<div class="project-description__item">
								<h3>분류<span class="item-notes"> :&nbsp;${projects[archProjectIndex].genre}</span></h3>
							</div>
							<div class="project-description__item">
								<h3>건축 면적<span class="item-notes"> :&nbsp;${projects[archProjectIndex].size}</span></h3>
							</div>
							<div class="project-description__item">
								<h3>진행 기간<span class="item-notes"> :&nbsp;${projects[archProjectIndex].duration}</span></h3>
							</div>
						</aside>
                    </div>
                    <button class="project-pdf"><a href="${
						projects[archProjectIndex].urlToPDF
					}" target="_blank">관련 기사 보기</a></button>
                    <div class="carousel">
                    ${projects[archProjectIndex].carousel
						.map((el) => {
							return `<div class="slide">
                            <img src="../assets/images/arch_consulate_${el}.jpg" alt="" class="slide__image" />
                        </div>`;
						})
						.join('')}
                        <button class="carousel__btn carousel__btn--left">&larr;</button>
                        <button class="carousel__btn carousel__btn--right">&rarr;</button>
                        <div class="dots"></div>
                    </div>			
    </section>
    <div class="divider"></div>
    <section class="project project--margin" id="project-display">
                    <div class="wrapper-arch-art">
                        <img class="" src="../assets/images/display_cover_0.png" alt="" />
                        <img class="" src="../assets/images/display_set_01.png" alt="" />
                        <img class="" src="../assets/images/display_set_02.png" alt="" />
                    </div>
                    <h1 class="project-title">${projects[displayProjectIndex].title}</h1>
					<p class="project-synposis project-synposis__archart">${projects[displayProjectIndex].synposis}</p>
                    <div class="project-description">
						<aside class="project-description__aside aside__long" id="asideArchArt">
							<div class="project-description__item">
								<h3>분류<span class="item-notes"> :&nbsp;${projects[displayProjectIndex].genre}</span></h3>
							</div>
							<div class="project-description__item">
								<h3>사용한 자재<span class="item-notes"> :&nbsp;${
									projects[displayProjectIndex].materials
								}</span></h3>
							</div>
							<div class="project-description__item">
								<h3>진행 기간<span class="item-notes"> :&nbsp;${projects[displayProjectIndex].duration}</span></h3>
							</div>
						</aside>
                    </div>
					<button class="project-pdf"><a href="${
						projects[displayProjectIndex].urlToPDF
					}" target="_blank">기획서 보기</a></button>
    </section>
    <div class="divider"></div>
    <section class="project project--margin" id="project-panam">
                    <div class="wrapper-arch-art">
                        <img class="" src="../assets/images/art_panam_cover.jpg" alt="" />
                        <img class="project__panam--second-img" src="../assets/images/art_panam_07.jpg" alt="" />
                    </div>
                    <h1 class="project-title">${projects[artProjectIndex].title}</h1>
					<p class="project-synposis project-synposis__archart">${projects[artProjectIndex].synposis}</p>
                    <div class="project-description">
						<aside class="project-description__aside aside__long" id="asideArchArt">
							<div class="project-description__item">
								<h3>팀<span class="item-notes"> :&nbsp;${projects[artProjectIndex].team}</span></h3>
							</div>
							<div class="project-description__item">
								<h3>분류<span class="item-notes"> :&nbsp;${projects[artProjectIndex].genre}</span></h3>
							</div>
							<div class="project-description__item">
								<h3>사용한 자재<span class="item-notes"> :&nbsp;${projects[artProjectIndex].materials}</span></h3>
							</div>
							<div class="project-description__item">
								<h3>진행 기간<span class="item-notes"> :&nbsp;${projects[artProjectIndex].duration}</span></h3>
							</div>
						</aside>
                    </div>
                    <button class="project-pdf"><a href="${
						projects[artProjectIndex].urlToPDF
					}" target="_blank">관련 기사 보기</a></button>	
    </section>

`;

main.insertAdjacentHTML('afterbegin', archArtMarkup);

// Insert Carousel Elements
const carousel = function () {
	const slides = document.querySelectorAll('.slide');
	const btnLeft = document.querySelector('.carousel__btn--left');
	const btnRight = document.querySelector('.carousel__btn--right');
	const dotContainer = document.querySelector('.dots');

	let curSlide = 0;
	const maxSlide = slides.length;

	const createDots = function () {
		slides.forEach(function (_, i) {
			dotContainer.insertAdjacentHTML(
				'beforeend',
				`<button class="dots__dot" data-slide="${i}"></button>`
			);
		});
	};

	const activateDot = function (slide) {
		document
			.querySelectorAll('.dots__dot')
			.forEach((dot) => dot.classList.remove('dots__dot--active'));

		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add('dots__dot--active');
	};

	const goToSlide = function (slide) {
		slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
	};

	// Next slide
	const nextSlide = function () {
		if (curSlide === maxSlide - 1) {
			curSlide = 0;
		} else {
			curSlide++;
		}

		goToSlide(curSlide);
		activateDot(curSlide);
	};

	const prevSlide = function () {
		if (curSlide === 0) {
			curSlide = maxSlide - 1;
		} else {
			curSlide--;
		}
		goToSlide(curSlide);
		activateDot(curSlide);
	};

	const init = function () {
		goToSlide(0);
		createDots();

		activateDot(0);
	};
	init();

	// Event handlers
	btnRight.addEventListener('click', nextSlide);
	btnLeft.addEventListener('click', prevSlide);

	document.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowLeft') prevSlide();
		e.key === 'ArrowRight' && nextSlide();
	});

	dotContainer.addEventListener('click', function (e) {
		if (e.target.classList.contains('dots__dot')) {
			const { slide } = e.target.dataset;
			goToSlide(slide);
			activateDot(slide);
		}
	});
};
carousel();
