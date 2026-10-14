for (let i = 0; i < 5; i++) {
    console.log(i);
}

const names = ['Mario', 'Nicola', 'Giovanna', 'Maria', 'Ernesto','Anna','Antonio','Elena'];

for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
}

for (let i = names.length - 1; i >= 0; i--) {
    console.log(names[i]);
}

for (let i = 0; i <= 20; i += 2) {
    // i += 2 significa i = i + 2
    console.log(i);
}

for (const name of names) {
    console.log(name);
}

const user = {
    name: 'Mario',
    surname: 'Rossi',
    age: 25,
    active: true,
    address: {
        street: 'via Roma',
        number: 20,
        city: 'Milano',
    },
};

for (const key in user) {
    if (key === 'address') {
        for (const key in user.address) {
            console.log(`${key} = ${user.address[key]}`);
        }
    } else {
        console.log(`${key} = ${user[key]}`);
    }
}

console.log('----WHILE-----')
let n = 11;
while (n <= 10) {
    console.log(n);
    n++;
}

console.log('----DO-WHILE-----')
let x = 11;
do {
    console.log(x);
    x++;
} while (x <= 10);

let i = 0;
while (names[i] !== 'Maria') {
    console.log(names[i]);
    i++;
}

const numbers = [1, 26, 24, 32, 8, 48];

for (const number of numbers) {
    if (number > 30) {
        console.log(`Trovato ${number}`);
        break;
    }
    console.log(number);
}

for(let i = 0; i < 20; i++) {
    if (i % 2 === 0) continue;
    console.log(i);
}

for (let i = 0; i < names.length; i++) {
    if(!names[i].startsWith('A')) continue;
    console.log(names[i]);
}

let thisDay = 'Sabato';

if (thisDay === 'Lunedi') {
    console.log('È il primo giorno della settimana');
} else if (thisDay === 'Martedi') {
    console.log('È il secondo giorno della settimana');
} else if (thisDay === 'Mercoledi') {
    console.log('È il terzo giorno della settimana');
} else if (thisDay === 'Giovedi') {
    console.log('È il quarto giorno della settimana');
} else if (thisDay === 'Venerdi') {
    console.log('È il quinto giorno della settimana');
} else if (thisDay === 'Sabato') {
    console.log('È il sesto giorno della settimana');
} else if (thisDay === 'Domenica') {
    console.log('FESTA!!!');
}

switch (thisDay) {
    case 'Lunedi':
        console.log('È il primo giorno della settimana');
        break;

    case 'Martedi':
        console.log('È il secondo giorno della settimana');
        break;

    case 'Mercoledi':
        console.log('È il terzo giorno della settimana');
        break;

    case 'Giovedi':
        console.log('È il quarto giorno della settimana');
        break;

    case 'Venerdi':
        console.log('È il quinto giorno della settimana');
        break;

    case 'Sabato':
        console.log('È il sesto giorno della settimana');
        break;

    default:
        console.log('Festa!!!');
        break;
}

let productPrice = 40;
let discount;

switch (true) {
    case productPrice <= 20:
        discount = 0;
        console.log(`Il prezzo finale del prodotto è ${productPrice}`);
        break;

    case productPrice <= 40:
        discount = 0.1;
        console.log(
            `Prezzo iniziale: ${productPrice} - Sconto ${discount * 100}% - Prezzo finale: ${productPrice - productPrice * discount}`,
        );
        break;

    case productPrice <= 60:
        discount = 0.15;
        console.log(
            `Prezzo iniziale: ${productPrice} - Sconto ${discount * 100}% - Prezzo finale: ${productPrice - productPrice * discount}`,
        );
        break;

    default:
        discount = 0.2;
        console.log(
            `Prezzo iniziale: ${productPrice} - Sconto ${discount * 100}% - Prezzo finale: ${productPrice - productPrice * discount}`,
        );
        break;
}

//* const numbers10 = []; //
// for (let i = 0; i < 12; i++) {
//    let casualNum = Math.floor(Math.random() * 11);
//    for (let j = 0; j < numbers10.length; j++) {
//        if (casualNum === numbers10[j]) {
//            casualNum = Math.floor(Math.random() * 11);
//        } else {
//            numbers10.push(casualNum);
//        }
//    }
//} 
// console.log(numbers10); *//

//* const myElement = document.getElementById('myElement');
// console.log(myElement.textContent);*//

// console.log(numbers10);

const linkInterno = document.querySelector('.container a');
const title = document.querySelector('#title');

console.log(linkInterno.textContent);
console.log(title.textContent);

const navLinks = document.querySelectorAll('nav ul li a');
console.log(navLinks);

for (const link of navLinks) {
    console.log(link.textContent);
}

const newText = document.querySelector('#newText');
newText.textContent += ' inserito da JavaScript';

const personsList = document.querySelector('#personsList');

for (let i = 0; i < names.length; i++) {
    personsList.innerHTML += `<li>${names[i]}</li>`;
}

const firstElement = document.querySelector('#personsList li:first-child');
firstElement.style.color = 'red';
firstElement.style.fontWeight = 'bold';