'use strict';

const allImageWrappers = Array.from(document.querySelectorAll('.img-wrapper'));

// Hover : Add text, dim image
allImageWrappers.forEach((el) =>
	el.addEventListener('mouseover', function () {
		el.querySelector('.img-wrapper__title').classList.remove('img-wrapper__title--hidden');
		el.querySelector('img').classList.add('img--dim');
	})
);

allImageWrappers.forEach((el) =>
	el.addEventListener('mouseout', function () {
		el.querySelector('.img-wrapper__title').classList.add('img-wrapper__title--hidden');
		el.querySelector('img').classList.remove('img--dim');
	})
);
