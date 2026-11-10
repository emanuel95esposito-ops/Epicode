const theme = document.querySelector('#theme');

theme.addEventListener('click', () => {
	const myHtml = document.querySelector('html');
	let myTheme = myHtml.getAttribute('data-bs-theme');
	if ((myTheme === 'dark')) {
		myHtml.setAttribute('data-bs-theme', 'light');
	} else {
		myHtml.setAttribute('data-bs-theme', 'dark');
	}
});

