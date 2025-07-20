'use strict';
import { projects } from './data.js';

// Insert Content
const projectIndex = 0;
const main = document.querySelector('main');
const ARPGMarkup = `
<section class="project">
				<div class="wrapper">
                    <iframe src="https://www.youtube.com/embed/${
						projects[projectIndex].urlToVideo
					}?&theme=dark&autohide=2&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
				</div>
				<h1 class="project-title">${projects[projectIndex].title}</h1>
				<p class="project-synposis">${projects[projectIndex].synposis}</p>
				<div class="project-description">
					<aside class="project-description__aside">
						<div class="project-description__item">
							<h3>장르<span class="item-notes"> :&nbsp;${projects[projectIndex].genre}</span></h3>
						</div>
						<div class="project-description__item">
							<h3>사이즈<span class="item-notes"> :&nbsp;${projects[projectIndex].size}</span></h3>
						</div>
						<div class="project-description__item">
							<h3>사용 툴<span class="item-notes"> :&nbsp;${projects[projectIndex].tools}</span></h3>
						</div>
					</aside>
					<div class="design">
						<div class="design__intention--wrapper">
							${projects[projectIndex].intentionsIcon
								.map((el, i) => {
									return `
									<article class="design__intention">
										<img src="${el}" alt="" />
										<h3>${projects[projectIndex].intentions[i]}</h3>
									</article>
									`;
								})
								.join('')}
						</div>
					</div>
				</div>
				<button class="project-pdf"><a href="${
					projects[projectIndex].urlToPDF
				}" target="_blank">기획서 보기</a></button>
				
				<div class="carousel">
				${projects[projectIndex].carousel
					.map((el) => {
						return `<div class="slide">
						<img src="../assets/images/arpg_${el}.png" alt="" class="slide__image" />
					</div>`;
					})
					.join('')}
					<button class="carousel__btn carousel__btn--left">&larr;</button>
					<button class="carousel__btn carousel__btn--right">&rarr;</button>
					<div class="dots"></div>
				</div>
</section>
`;

main.insertAdjacentHTML('afterbegin', ARPGMarkup);

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
