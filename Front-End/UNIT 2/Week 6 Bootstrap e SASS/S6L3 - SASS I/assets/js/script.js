const myForm = document.querySelector('form');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const verify = document.querySelector('#verify');
const winner = document.querySelector('#winner');
const resetForm = document.getElementById('resetForm');

let extracted;

function clickExtract() {
	let join1 = player1.value;
	let join2 = player2.value;
	if (!verifyForm(join1, join2)) {
		verify.textContent = 'Entrambi i giocatori devono puntare su un numero';
		return;
	}
	extract();
	// -------------IF PER L'IMBROGLIO---------------
	// if (extracted == 0) {
	// 	print();
	// 	verifyWin(join1, join2);
	// } else if (
	// 	join2 == extracted ||
	// 	Math.abs(join2 - extracted) < Math.abs(join1 - extracted)
	// ) {
	// 	clickExtract();
	// } else {
	// 	print();
	// 	verifyWin(join1, join2);
	// }
	print();
	verifyWin(join1, join2);
}

myForm.addEventListener('submit', (e) => {
	e.preventDefault();
	clickExtract();
});

function verifyForm(num1, num2) {
	if (num1 === '' || num2 === '') {
		return false;
	}
	return true;
}

function extract() {
	extracted = Math.floor(Math.random() * 37);
}

function print() {
	verify.textContent = `Il numero estratto è ${extracted}`;
}

function verifyWin(num1, num2) {
	switch (true) {
		case extracted == 0:
			winner.textContent = 'Vince il banco!';
			break;

		case num1 == num2 && num1 == extracted:
			winner.textContent = 'Vincono entrambi i giocatori';
			break;

		case num1 == extracted:
			winner.textContent = 'Vince il giocatore 1';
			break;

		// Da commentare per realizzare l'imbroglio
		case num2 == extracted:
			winner.textContent = 'Vince il giocatore 2';
			break;

		case Math.abs(num1 - extracted) < Math.abs(num2 - extracted):
			winner.textContent = 'Il giocatore 1 si è avvicinato di più';
			break;

		// Da commentare per realizzare l'imbroglio
		case Math.abs(num2 - extracted) < Math.abs(num1 - extracted):
			winner.textContent = 'Il giocatore 2 si è avvicinato di più';
			break;

		case Math.abs(num2 - extracted) == Math.abs(num1 - extracted):
			winner.textContent =
				'Entrambi i giocatori si sono avvicinati allo stesso modo';
			break;
	}
}

resetForm.addEventListener('click', function (e) {
	e.preventDefault();
	myForm.reset();
	winner.textContent = '';
	verify.textContent = '';
});
