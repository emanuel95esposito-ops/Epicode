const firstBtn = document.querySelector('#firstBtn');
const secondBtn = document.querySelector('#secondBtn');
const title = document.querySelector('#title');
const logo = document.querySelector('#logo');
// form
const myForm = document.querySelector('#myForm');
const userNameInput = document.querySelector('#userName');
const userEmail = document.querySelector('#userEmail');
const eta = document.querySelector('#eta');
const userMessage = document.querySelector('#userMessage');
const course = document.querySelector('#course');
const submitData = document.querySelector('#submitDate');
const fullTime = document.querySelector('#fullTime');
const partTime = document.querySelector('#partTime');
const serale = document.querySelector('#serale');
const nameError = document.querySelector('#nameError');
const emailError = document.querySelector('#emailError');
const selectError = document.querySelector('#selectError');
const checkError = document.querySelector('#checkError');

// Event delegation
const taskForm = document.querySelector('#taskForm');
const newTask = document.querySelector('#newTask');
const taskList = document.querySelector('#taskList');

// Oggetto per impacchettare i dati del form
const userData = {
	userName: '',
	userEmail: '',
	userAge: 0,
	userMessage: '',
	userCourse: '',
	userDate: '',
	userFrequency: [],
};

const myElements = [];

firstBtn.addEventListener('click', (e) => {
	console.log(e);
	console.log(e.type);
	console.log(e.target);
	console.log(e.target.id);
	console.log(e.target.type);
	console.log('Button cliccato!');
	if (secondBtn.getAttribute('disabled')) {
		secondBtn.removeAttribute('disabled');
	}
});

secondBtn.addEventListener('click', () => {
	console.log('Non puoi cliccarmi più!');
	secondBtn.setAttribute('disabled', true);
});

title.addEventListener('click', (e) => {
	console.log(`Hai cliccato su ${e.target.id}`);
});

logo.addEventListener('click', (e) => {
	logo.classList.toggle('big');
});

userNameInput.addEventListener('blur', (e) => {
	if (userNameInput.value === '') {
		nameError.textContent = 'Compilare il campo nome completo!';
	} else {
		nameError.textContent = '';
	}
});

userEmail.addEventListener('blur', (e) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (userEmail.value === '') {
		emailError.textContent = 'Compilare il campo email!';
	} else if (!emailRegex.test(userEmail.value)) {
		emailError.textContent = 'Inserire una email valida!';
	} else {
		emailError.textContent = '';
	}
});

course.addEventListener('blur', (e) => {
	if (course.value === '') {
		selectError.textContent = 'Indicare il corso scelto';
	} else {
		selectError.textContent = '';
	}
});

myForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (!validForm()) {
		return;
	}
	console.log('Form inviato!');
	userData.userName = userNameInput.value.trim();
	userData.userEmail = userEmail.value.trim();
	userData.userAge = eta.value;
	userData.userMessage = userMessage.value;
	userData.userCourse = course.value;
	userData.userDate = submitData.value;
	if (fullTime.checked) {
		userData.userFrequency.push(fullTime.value);
	}
	if (partTime.checked) {
		userData.userFrequency.push(partTime.value);
	}
	if (serale.checked) {
		userData.userFrequency.push(serale.value);
	}
	console.log(userData);
	localStorage.setItem('newUser', JSON.stringify(userData));
	window.location.href = window.location.href + 'grazie.html'; // Redirect alla pagina grazie.html DOPO la compilazione e l'invio del form
});

function validForm() {
	if (!fullTime.checked && !partTime.checked && !serale.checked) {
		checkError.textContent = 'Selezionare almeno una frequenza!';
		return false;
	} else {
		checkError.textContent = '';
	}
	return true;
}

// Event delegation

function createList() {
	taskList.textContent = '';
	if (myElements.length === 0) {
		const newP = document.createElement('p');
		newP.textContent = 'Non ci sono elementi';
		taskList.appendChild(newP);
		return;
	}
	myElements.forEach((element, index) => {
		const newLi = document.createElement('li');
		newLi.textContent = element;
		const newBtn = document.createElement('button');
		newBtn.setAttribute('type', 'button');
		newBtn.setAttribute('id', index + 1);
		newBtn.textContent = 'ELIMINA';
		newLi.appendChild(newBtn);
		taskList.appendChild(newLi);
	});
}

createList();

taskForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let task = newTask.value;
	myElements.push(task);
	createList();
});

taskList.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.type === 'button') {
		console.log(`Hai cliccato il button con id ${e.target.id}`);
		myElements.splice(e.target.id - 1, 1);
		createList();
	}
});

// BOM
console.log(window.location.href);
document.querySelector('#btnLink').addEventListener('click', (e) => {
	e.preventDefault();
	window.location.href = 'https://www.google.it/';
});

setTimeout(() => {
	cLog();
}, 2000);

function cLog() {
	console.log('appaio dopo due secondi');
}

let counter = 0
const tic = setInterval(() => {
    counter += 1;
    if (counter === 10) {
        clearInterval(tic);
    }
    console.log(`Numero ${counter}`);
}, 1000);

// ci manca l'ultimo pezzo, vedi da registrazione***