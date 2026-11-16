const studentList = document.querySelector('#studentList');
const registerForm = document.querySelector('form');
const newName = document.querySelector('#newName');
const newSurname = document.querySelector('#newSurname');
const newAge = document.querySelector('#newAge');
const newFrequency = document.querySelector('#newFrequency');

const newStudents = [];

class Student {
	#id; // INCAPSULAMENTO: La variabile esiste ESCLUSIVAMENTE all'interno della classe, può essere definita e letta ESCLUSIVAMENTE dentro la classe (vedi this.#id a riga 27)
	constructor(_studentName, _studentSurname, _studentAge, _frequency) {
		this.#id = crypto.randomUUID();
		this.studentName = _studentName;
		this.studentSurname = _studentSurname;
		this.studentAge = _studentAge;
		if (_frequency === 'true') {
			this.frequency = true;
		} else {
			this.frequency = false;
		}
	}

	printStudent() {
		const isFrequency = this.frequency ? 'Sì' : 'No';
		const newLi = document.createElement('li');
		newLi.textContent += `Student ${this.studentName} ${this.studentSurname} di anni ${this.studentAge}, frequentante: ${isFrequency}, ID studente: ${this.#id}`;
		studentList.appendChild(newLi);
	}
}

registerForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const newStudent = new Student(
		newName.value,
		newSurname.value,
		newAge.value,
		newFrequency.value,
	);
	console.log(newStudent);
	newStudent.printStudent();
	newStudents.push(newStudent);
	registerForm.reset();
	console.log(newStudents);
});

class Person {
	personNumber = 0;
	constructor(_name, _surname) {
		this.name = _name;
		this.surname = _surname;
	}

	regards() {
		this.personNumber++;
		return `Ciao, sono ${this.name} ${this.surname} e sono l'iscritto numero ${this.personNumber}`;
	}
}

const newPerson = new Person('Paolino', 'Paperino');
console.log(newPerson.regards());

newPerson.name = 'Mario';
console.log(newPerson.regards());

const otherPerson = new Person('Aldo', 'Bianchi');
console.log(newPerson.regards());
console.log(otherPerson.regards());

console.log(newPerson);
console.log(Person);

class Book {
	// superclasse per classi che ereditano gli stessi proprietà e metodi
	constructor(_title, _author) {
		this.title = _title;
		this.author = _author;
	}

	printBook() {
		console.log(`${this.title} di ${this.author}`);
	}
}

class BookFormat extends Book {
	// EREDITARIETÀ: Sottoclasse che aggiunge proprietà singole alle proprietà EREDITATE dalla superclasse
	constructor(_title, _author, _format) {
		super(_title, _author);
		this.format = _format;
	}

	printBook() {
		// POLIMORFISMO: una sottoclasse può modificare il metodo presente nella superclasse
		console.log(
			`Il libro ${this.title} di ${this.author} è in formato ${this.format}`,
		);
	}
}

const newBook = new Book('Il nome della rosa', 'Umberto Eco');
newBook.printBook();

const otherBook = new BookFormat('Novecento', 'Alessandro Baricco', 'digitale');
otherBook.printBook();

class Music {
	// Superclasse che servirà SOLO da modello
	constructor(_title, _author, _year) {
		this.title = _title;
		this.author = _author;
		this.year = _year;
	}

	print() {
		return `Il disco ${this.title} di ${this.author} del ${this.year}`;
	}
}

class Vynil extends Music {
	constructor(_title, _author, _year, _length) {
		super(_title, _author, _year);
		this.length = _length;
	}

	print() {
		return (
			super.print() + ` è in formato vinile di grandezza ${this.length}"`
		);
	}
}

class CompactDisc extends Music {
	constructor(_title, _author, _year, _format) {
		super(_title, _author, _year);
		this.format = _format;
	}

	print() {
		return super.print() + ` è in formato CD ${this.format}`;
	}
}

class Digital extends Music {
	constructor(_title, _author, _year, _format, _dimension) {
		super(_title, _author, _year);
		this.format = _format;
		this.dimension = _dimension;
	}
	print() {
		return (
			super.print() +
			` è in formato digitale ${this.format} di dimensioni ${this.dimension}`
		);
	}
}

const myVynil1 = new Vynil('The Wall', 'Pink Floyd', 1978, '33');
console.log(myVynil1.print());

const myCD1 = new CompactDisc('AfterMath', 'Rolling Stones', 1967, 'SACD');
console.log(myCD1.print());

const myDigital1 = new Digital(
	'Space Cowboy',
	'Jamiroquai',
	1997,
	'FLAC',
	'240MB',
);
console.log(myDigital1.print());
