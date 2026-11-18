console.log('Prima: riga 1');
setTimeout(() => console.log('Dopo: riga 2'), 1000);
console.log('Subito dopo: riga 3');

// Promise
const isLoading = document.querySelector('.spinner-border');
const info = document.querySelector('#info');

const libri = ['Primo', 'Secondo', 'Terzo'];
const promessa = new Promise((resolve, reject) => {
	setTimeout(() => {
		if (libri.length > 0) {
			resolve(`Sono arrivati: ${libri}`);
			console.log(promessa);
		} else {
			reject('Non ci sono libri');
			console.log(promessa);
		}
	}, 1000);
});

console.log(promessa);

promessa
	.then((messaggio) => {
		printLibri(messaggio);
	})
	.catch((messaggio) => {
		printLibri(messaggio);
	})
	.finally(() => {
		isLoading.style.display = 'none';
	});

function printLibri(messaggio) {
	console.log(messaggio);
	info.textContent = messaggio;
}

// Gestione stato della promise
const semaforo = document.querySelector('#semaforo');
const spinSemaforo = document.querySelector('#spinSemaforo');
const promiseState = document.querySelector('#promiseState');
const testo = document.querySelector('#testo');

function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function show(light, text) {
	semaforo.textContent = light;
	promiseState.textContent = text;
}

show('🛑', 'Stop');
wait(2000)
	.then(() => show('🟢', 'Via'))
	.then(() => wait(2000))
	.then(() => show('🟡', 'Attendi...'))
	.then(() => wait(2000))
	.then(() => show('🛑', 'Stop'))
	.then(() => hide());

function hide() {
	spinSemaforo.classList.add('hide');
	testo.classList.add('hide');
}

// FETCH
let myUsers = [];
const users = document.querySelector('#users');
fetch('https://jsonplaceholder.typicode.com/users')
	.then((response) => response.json())
	.then((data) => {
		myUsers = data;
	})
	.then(() => printUsers())
	.catch((err) => {
		users.textContent = err;
		console.error(err);
	});

function printUsers() {
	console.log(myUsers);
	myUsers.forEach((user) => {
		const newCol = document.createElement('div');
		newCol.classList.add('col-6');
		const newP = document.createElement('p');
		newP.textContent = `${user.name} ${user.username} - ${user.email}`;
		newCol.appendChild(newP);
		users.appendChild(newCol);
	});
}

const myForm = document.querySelector('form');
const userName = document.querySelector('#userName');
const userAlias = document.querySelector('#userAlias');
const userEmail = document.querySelector('#userEmail');
myForm.addEventListener('submit', function (e) {
	e.preventDefault();
	fetch('https://jsonplaceholder.typicode.com/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: userName.value,
			username: userAlias.value,
			email: userEmail.value,
		}),
	})
		.then((response) => response.json())
		.then((data) => console.log(data));
});

fetch('https://jsonplaceholder.typicode.com/users/1', {
	method: 'PATCH',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		username: 'Pippo',
	}),
})
	.then((response) => response.json())
	.then((data) => console.log(data));

fetch('https://jsonplaceholder.typicode.com/users/2', {
	method: 'DELETE',
})
	.then((response) => {
		console.log(response);
		response.json();
	})
	.then((data) => console.log(data));
