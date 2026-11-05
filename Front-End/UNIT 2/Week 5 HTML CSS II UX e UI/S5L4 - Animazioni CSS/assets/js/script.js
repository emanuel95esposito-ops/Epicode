const images = document.querySelectorAll('.carousel img');

images.forEach((image) => {
	image.addEventListener('mouseover', (e) => {
		e.preventDefault();
		image.setAttribute('id', 'imgHover');
	});
});

images.forEach((image) => {
	image.addEventListener('mouseout', (e) => {
		e.preventDefault();
		image.removeAttribute('id');
	});
});
