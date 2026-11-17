import data from '../data/data.json' with { type: 'json' };

console.log(data);
console.log(data.persons[0]);

localStorage.setItem('myData', JSON.stringify(data));

const newCourse = {
    azienda: 'XYZ',
    corsi: ['python', 'Machine Learning']
}

data.courses.push(newCourse);

const newData = JSON.parse(localStorage.getItem('myData'));
console.log(newData);

console.log(data.courses);

class Book {
	static id;
	constructor(_title, _author, _year) {
		this.id = crypto.randomUUID();
		this.title = _title;
		this.author = _author;
		this.year = _year;
	}
}

const newBook = new Book('Il nome della rosa', 'Umberto Eco', 1980);

console.log(newBook);
console.log(JSON.stringify(newBook));
console.log(newBook.id);

let myString = JSON.stringify(newBook);
console.log(JSON.parse(myString));
