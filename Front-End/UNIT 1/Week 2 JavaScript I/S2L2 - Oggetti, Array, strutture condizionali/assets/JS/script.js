const persona = {
    nome: 'Mario',
    cognome: 'Rossi',
    eta: 25,
    attivo: true,
    'corso scelto': 'FS0326'
};

console.log(persona);

const myPerson = document.getElementById('myPerson');
myPerson.innerText = `${persona.nome} ${persona.cognome} di anni ${persona.eta}`;

persona.nome = 'Maria';
console.log(persona);
document.getElementById('myPerson2').innerText = `${persona.nome} ${persona.cognome} di anni ${persona.eta}`;

persona.eta = 38;
console.log(persona);
document.getElementById('myPerson3').innerText = `${persona.nome} ${persona.cognome} di anni ${persona.eta}`;

console.log(persona.nome, persona.cognome);

persona.eta = 32;
console.log(persona);

persona.citta = 'Roma';
console.log(persona);

delete persona.attivo;
console.log(persona);

console.log(persona['corso scelto']);

delete persona.citta;

persona.indirizzo = {
    via: 'Roma',
    civico: 20,
    citta: 'Napoli'
}

console.log(persona);

const disco = {
    titolo: 'The dark side of the moon',
    autore: 'Pink Floyd',
    anno: 1973,
    caseDisc: {
        europa: 'RCA',
        USA: 'Columbia',
        sudamerica: 'CBS'
    },
    genere: 'progressive'
}

console.log(disco);

console.log(disco.caseDisc.USA);

console.log(Object.hasOwn(persona, 'scuola'));
console.log(Object.hasOwn(persona, 'nome'));

delete persona.eta;

persona.anno = 1980;
let annoCorrente = 2026;

persona.eta = annoCorrente - persona.anno;

console.log(persona);

console.log('-------------------');

const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile'];
console.log(mesi);

const myArray = document.getElementById('myArray');
myArray.innerText = mesi;

const number = [10, 2, 43, 24, 51, 76];

const student = ['Aldo', 'Bianchi', 30, true];

console.table(persona);
console.table(mesi);

console.log(mesi[0]);
console.log(mesi.length);
console.log(mesi[mesi.length - 1]);
console.log(mesi.at(-1));

student[1] = 'verdi';
console.log(student);

console.log(number.at(4));

number[number.lenght] = 18;
console.log(number);

number[number.lenght] = [3, 67, 21];
console.log(number);

const newStudent = student.with(0, 'Giovanna');
console.log(student, newStudent);

mesi.push('Maggio');
console.log(mesi);

let rimosso = mesi.pop();
console.log(mesi, `Mese rimosso: ${rimosso}`);

mesi.unshift('Dicembre');
console.log(mesi);

let rimosso2 = mesi.shift();
console.log(mesi, `Mese rimosso: ${rimosso2}`);

const names = ['Alessandro', 'Federico', 'Francesca', 'Miriam', 'Giuseppe'];
console.log(names);

names.splice(1, 2);
console.log(names);

names.splice(0, 0, 'Fabio', 'Lisa');
console.log(names);

names.splice(1, 1, 'Gabriele', 'Laura', 'Mattia');
console.log(names);

const newNames = names.toSpliced(0, names.length / 2);
console.log(newNames);

const students = [
    {
        nome: 'Mario',
        cognome: 'Rossi'
    },
    {
        nome: 'Aldo',
        cognome: 'Bianchi'
    },
    {
        nome: 'Giovanna',
        cognome: 'Neri'
    },
];

console.log(students);
console.log(students[1].cognome); // Prendi il valore della proprietà 'cognome' dell'oggetto in posizione 1 nell'Array students

const prodotti = [
    {
        nome: 'Penna',
        prezzo: 1.5,
        disponibile: true,
    },
    {
        nome: 'Quaderno',
        prezzo: 4.0,
        disponibile: false,
    },
];

console.log(`Abbiamo ${prodotti.length} prodotti`);

prodotti.push({
    nome: 'Astuccio',
    prezzo: 12.0,
    disponibile: true,
});

console.log(`Abbiamo ${prodotti.length} prodotti`);

names.sort();
console.log(names);

names.reverse();
console.log(names);

number.sort();
console.log(number);

number.reverse();
console.log(number);

// Cambiare prezzo di un oggetto: Quaderno
// Cambiare prezzo di un oggetto: Quaderno
for (let i = 0; i < prodotti.length; i++) {
    if (prodotti[i].nome === 'Quaderno') {
        prodotti[i].prezzo = 12.0;
    }
}

console.log(prodotti);

console.log('---------------');

let voto = 24;
let iscritto = true;

if (voto >= 26) {
    console.log('Ottimo');
} else if (voto > 20) {
    console.log('Buono');
} else {
    console.log('Sufficiente');
}

let myAge = 14;
const myState =
    myAge >= 18
        ? `Hai ${myAge} anni, sei maggiorenne`
        : `Hai ${myAge} anni, sei minorenne`;
console.log(myState);

if (iscritto) {
    if (voto >= 26) {
        console.log('Ottimo');
    } else if (voto > 20) {
        console.log('Buono');
    } else {
        console.log('Sufficiente');
    }
} else {
    console.log('Non può sostenere l\'esame');
}

let num1 = 12;
let num2 = 28;

if (num1 = num2) { //ERRORE! = è un operatore di assegnazione, per cui con questa riga num2 diventa UGUALE a num1. Sintassi corretta: if (num1===num2)
    console.log('num1 e num2 sono uguali');
} else {
    console.log('num1 e num2 sono diversi');
}

if (num1 === num2) {
    console.log('num1 e num2 sono uguali');
} else {
    console.log('num1 e num2 sono diversi');
}