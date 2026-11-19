// import { loadUsers } from "./functions.js";

const usersList = document.querySelector('#usersList');
// const myUsers = await loadUsers();

export const printUsers = (myUsers) => {
	usersList.textContent = '';
	myUsers.forEach((user) => {
		const newLi = document.createElement('li');
		newLi.textContent = `${user.name} - Username: ${user.username} Email: ${user.email}`;
		usersList.appendChild(newLi);
	});
};
