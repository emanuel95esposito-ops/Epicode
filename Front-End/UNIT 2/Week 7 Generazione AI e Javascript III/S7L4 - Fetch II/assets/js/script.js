import newUser from '../import/classes.js';
import { loadUsers } from '../import/functions.js';
import { printUsers } from '../import/render.js';

// const usersList = document.querySelector('#usersList');
const nameUser = document.querySelector('#nameUser');
const myForm = document.querySelector('form');
const userName = document.querySelector('#userName');
const userEmail = document.querySelector('#userEmail');

const myUsers = await loadUsers();
console.log(myUsers);

myForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const addedUser = new newUser(
		nameUser.value,
		userName.value,
		userEmail.value,
	);
	saveUser(addedUser);
});

const saveUser = async (user) => {
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/users',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user),
			},
		);
		if (!response.ok) throw new Error(`${response.status}`);
		const newObject = await response.json();
		myUsers.push(newObject);
		printUsers(myUsers);
	} catch (err) {
		console.log(err);
	}
};

printUsers(myUsers);
