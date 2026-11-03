const overlay = document.querySelector('.overlay');
const openModal = document.querySelector('#openModal');
const closeModal = document.querySelector('.closeModal');
const myForm = document.querySelector('form');
const userName = document.querySelector('#userName');
const userEmail = document.querySelector('#userEmail');
const enrollDate = document.querySelector('#enrollDate');
const formResponse = document.querySelector('.formResponse');
const regName = document.querySelector('#regName');
const regEmail = document.querySelector('#regEmail');
const regDate = document.querySelector('#regDate');

const registeredUser = {
	userName: '',
	userEmail: '',
	enrollDate: '',
};

openModal.addEventListener('click', (e) => {
	e.preventDefault();
	overlay.style.display = 'block';
});

closeModal.addEventListener('click', (e) => {
	e.preventDefault();
	overlay.style.display = 'none';
});

myForm.addEventListener('submit', (e) => {
	e.preventDefault();
	registeredUser.userName = userName.value;
	registeredUser.userEmail = userEmail.value;
	registeredUser.enrollDate = enrollDate.value;

	formResponse.style.display = 'block';
	regName.textContent = registeredUser.userName;
	regEmail.textContent = registeredUser.userEmail;
	regDate.textContent = registeredUser.enrollDate;
	myForm.reset();
	overlay.style.display = 'none';
});