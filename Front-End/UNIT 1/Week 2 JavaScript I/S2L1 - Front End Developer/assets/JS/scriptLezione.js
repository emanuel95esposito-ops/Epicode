console.log('Hello world!');

console.log('Ciao', 3);

// Variabili

let myName;
myName = 'Pippo';
console.log('Il mio nome è ', myName);

myName = 5;
console.log('Il mio nome è ', myName);

const MYAGE = 37;
console.log('La mia età è', MYAGE);

// MYAGE = 25;
// console.log('La mia età è', MYAGE); 
// Il valore di una costante non può cambiare, per questo è una costante. E' bloccante, tutto il seguente non viene visualizzato

let myCourse = 'FS0326';
console.log(myCourse);

let strangeNumber = '18';
console.log(strangeNumber);

let myBoolean = true;
console.log(myBoolean);

let myVariable;
console.log(myVariable);

let userName = 'Paolino';
let userSurname = 'Paperino';

console.log('Il nome dell\'utente è ' + userName + ' ' + userSurname);
// template literale //Alt+96 per il backtick `
console.log(`Il nome dell\'utente è ${userName} ${userSurname}`);

let myEmpty = null;

console.log(typeof userName);
console.log(typeof MYAGE);
console.log(typeof myVariable);
console.log(typeof myBoolean);
console.log(typeof myEmpty);

let myRest = 10 % 2;
console.log(myRest);

let myRest2 = 5 % 2;
console.log(myRest2);

let num1 = 2;
let mySum = num1 += 3;
console.log(mySum);

mySum = num1 + 3;
console.log(mySum);

let anotherNum = 5;

let sumAnotherNum = anotherNum++;

console.log(++anotherNum);

let numberNum = 5;
let numberString = '5';

// Equality and disequality
console.log(`Le due variabili hanno tipo O valore uguale? ${numberNum == numberString}`);
console.log(`Le due variabili hanno tipo O valore diverso? ${numberNum != numberString}`);

// Strict Equality(totalmente uguale) and strict disequality(totalmente diseguale)
console.log(`Le due variabili hanno tipo E valore identico? ${numberNum === numberString}`);
console.log(`Le due variabili hanno tipo E valore diverso? ${numberNum !== numberString}`);

// Utilizzare SEMPRE strict equality (===) e strict disequality (!==)