let num1 = 5;
let num2 = 8;
let num3 = 14;

if (num1 >= num2 || (num2 >= num3 && num3 >= num1)) {
	console.log('fai qualcosa');
} else {
	console.log('fai altro');
}

switch (true) {
	case num1 >= num2:
		console.log('fai qualcosa');
		break;

	case num2 >= num3 && num3 >= num1:
		console.log('fai qualcosa');
		break;

	default:
		console.log('fai altro');
		break;
}

const vero = num1 >= num2 ? 'VERO' : 'FALSO';

for (let i = 0; i < 30; i++) {
	if (i % 2 === 0) {
		continue;
	}
	if (i === 25) {
		break;
	}
	console.log(i);
}

const MY_NAMES_ARRAY = ['Mario', 'Anna', 'Nicola', 'Giovanna', 'Antonio'];
console.log(MY_NAMES_ARRAY);

let banned = MY_NAMES_ARRAY.pop();
console.log(banned);
console.log(MY_NAMES_ARRAY);
MY_NAMES_ARRAY.push('Pippo');
console.log(MY_NAMES_ARRAY);
let banned2 = MY_NAMES_ARRAY.shift();
console.log(banned2);
console.log(MY_NAMES_ARRAY);
MY_NAMES_ARRAY.unshift('Paperino');
console.log(MY_NAMES_ARRAY);

MY_NAMES_ARRAY.splice(1, 2, 'Aldo', 'Maria', 'Antonia');
console.log(MY_NAMES_ARRAY);

MY_NAMES_ARRAY.forEach((name) => {
	if (name !== 'Paperino') {
		console.log(name);
	}
});

const NEW_NAMES_ARRAY = MY_NAMES_ARRAY.map((name) => {
	if (name !== 'Paperino') {
		return name;
	}
});

console.log(NEW_NAMES_ARRAY);

const MY_NUMBERS_ARRAY = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const PAIR_NUMBERS = MY_NUMBERS_ARRAY.filter((number) => number % 2 === 0);

console.log(PAIR_NUMBERS);

const NAMES_STARTSWITH_A = MY_NAMES_ARRAY.filter((name) =>
	name.startsWith('A'),
);
console.log(NAMES_STARTSWITH_A);

const TOTAL_NUMBERS = MY_NUMBERS_ARRAY.reduce((acc, number) => acc + number, 30);
console.log(TOTAL_NUMBERS);

const MY_USER = {
    userName: 'Paolino',
    userSurname: 'Paperino',
    'user Age': 50,
    registered: true
}

console.log(MY_USER['user Age']);
