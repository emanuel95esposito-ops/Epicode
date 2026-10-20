const title = document.querySelector('#title');
const myList = document.querySelector('#myList');
const myListAll = document.querySelectorAll('#myList li');
const myListGet = document.getElementsByClassName('myListLi');
const firstPar = document.querySelector('#firstPar');
const num1 = document.querySelector('#num1');
const myOption = document.querySelectorAll('#mySelect option');
const lightning = document.querySelector('#lightning');
const myToggle = document.querySelector('#myToggle');
const myTable = document.querySelector('#myTable');

const myListGetArray = Array.from(myListGet);
const myClassArray = ['light', 'green', 'red', 'cyan'];

const myElements = ['nuovo elemento 1', 'nuovo elemento 2', 'nuovo elemento 3'];

// console.log(document);
// console.log(document.body);

console.log(myListAll);
console.log(myListGet);
console.log(myListGetArray);

console.log(title.textContent);
firstPar.textContent = 'Sono scritto da Javascript';

console.log(Number(num1.value)); // TUTTO quello che arriva da un form è testo: se il dato di un campo type="number" ci serve come numero, va convertito con Number()
console.log(4);

myOption.forEach((option) => {
	console.log(option.value);
});

myListAll.forEach((element) => {
	element.textContent += ' della lista myList';
});

// Imposto un contatore a 0, come gli indici dell'array delle classi
// Non c'è classe di partenza
// Al primo click imposto classe di partenza a 0 (light)
// incremento il contatore a ogni click e modifico la classe con quella col valore del contatore; il contatore deve partire da 0
// se il contatore arriva a quattro (default), lo devo azzerare

let myCounter = 0;
myToggle.addEventListener('click', () => {
	switch (myCounter) {
		case 0:
			lightning.classList = myClassArray[myCounter];
			myCounter += 1;
			break;
		case 1:
			lightning.classList = myClassArray[myCounter];
			myCounter += 1;
			break;
		case 2:
			lightning.classList = myClassArray[myCounter];
			myCounter += 1;
			break;
		case 3:
			lightning.classList = myClassArray[myCounter];
			myCounter += 1;
			break;
		default: // reset del contatore e della classe
			myCounter = 0;
			lightning.removeAttribute('class');
			break;
	}
});

for (let i = 0; i < myElements.length; i++) {
	const newLi = document.createElement('li');
	newLi.textContent = myElements[i];
	myList.appendChild(newLi);
}

for (let i = 0; i < myElements.length; i++) {
	const newTr = document.createElement('tr');
	const tdId = document.createElement('td');
	tdId.textContent = i + 1;
	const nameTd = document.createElement('td');
	nameTd.textContent = myElements[i];
	newTr.appendChild(tdId);
	newTr.appendChild(nameTd);
	myTable.appendChild(newTr);
}