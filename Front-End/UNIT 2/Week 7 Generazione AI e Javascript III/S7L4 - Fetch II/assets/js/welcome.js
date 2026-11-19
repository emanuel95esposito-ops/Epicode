const welcomeUser = document.querySelector('#welcomeUser');
const btnLogout = document.querySelector('#logout');

const accesToken = localStorage.getItem('accessToken');
if (!accesToken) {
	location.href = './auth/login.html';
}

const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
const userName = loggedUser.userName;

welcomeUser.textContent = `Benvenuto ${userName}, sei nella tua area riservata!`;

btnLogout.addEventListener('click', function (e) {
	e.preventDefault();
	welcomeUser.textContent =
		'Tra tre secondi sarai reindirizzato alla pagina di login...';
	setTimeout(() => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('loggedUser');
		location.href = './auth/login.html';
	}, 3000);
});
