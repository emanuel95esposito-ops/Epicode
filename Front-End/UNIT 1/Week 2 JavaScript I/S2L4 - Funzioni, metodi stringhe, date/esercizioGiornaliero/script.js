/*
REGOLE
- Le risposte vanno scritte in JavaScript sotto ogni commento.
- Puoi testare aprendo index.html nel browser e guardando la console (DevTools).
- Cerca solo cose non viste a lezione. Tutto il necessario è già stato spiegato stamattina.
*/

/* ESERCIZIO 1 — area
   Funzione area(l1, l2) che ritorna l1 * l2.
   Stampa area(3, 4).
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function area(l1, l2) {
   return l1 * l2;
}

console.log(area(3, 4));

// versione riusabile

function area2() {
   let l3 = 3;
   let l4 = 4;
   return l3 * l4;
}

console.log(area2());

// versione variabili assegnate internamente 


/* ESERCIZIO 2 — sommaPazza
   Funzione sommaPazza(a, b): ritorna a + b.
   Se a === b: ritorna (a + b) * 3.
   Prova con (2, 3) e (4, 4).
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function sommaPazza(a, b) {
    if (a === b) {
        return (a + b) * 3;
    }

    return a + b;
}

console.log(sommaPazza(2, 3));
console.log(sommaPazza(4, 4));

/* ESERCIZIO 3 — distanzaDa19
   Funzione distanzaDa19(n): ritorna Math.abs(n - 19).
   Se n > 19: ritorna distanza * 3.
   Prova con 5 e 25.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function distanzaDa19(n) {
   if ( n > 19 ) {
      return Math.abs(n - 19)*3 ;
   }

   return Math.abs(n - 19);
}

console.log(distanzaDa19(5));
console.log(distanzaDa19(25));


/* ESERCIZIO 4 — dentroIntervallo
   Funzione dentroIntervallo(n):
   true se n è tra 20 e 100 (compresi) oppure è esattamente 400.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function dentroIntervallo(n) {
   if ( (n >= 20 && n <=100) || n === 400 ) {
      return true;
   }

      return false;
}

console.log(dentroIntervallo(19));
console.log(dentroIntervallo(58));
console.log(dentroIntervallo(100));
console.log(dentroIntervallo(368));
console.log(dentroIntervallo(400));

/* ESERCIZIO 5 — epify
   Funzione epify(testo): aggiunge "EPICODE " davanti.
   Se il testo comincia già con "EPICODE", lo lascia invariato.
   Usa startsWith.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function epify(testo) {
   if (testo.startsWith("EPICODE")) {
      return testo;
   }

   return "EPICODE " + testo;
}

console.log(epify("Academy"));
console.log(epify("EPICODE Academy"));

/* ESERCIZIO 6 — divisibilePer3o7
   Funzione divisibilePer3o7(n): true se n positivo E divisibile per 3 O per 7.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function divisibilePer3o7(n) {
    if (n > 0 && (n % 3 === 0 || n % 7 === 0)) {
        return true;
    }

    return false;
}

console.log(divisibilePer3o7(10));
console.log(divisibilePer3o7(21));
console.log(divisibilePer3o7(27));
console.log(divisibilePer3o7(42));

/* ESERCIZIO 7 — invertiStringa
   Funzione invertiStringa(testo): ritorna la stringa invertita.
   Vincolo: niente .reverse() di array.
   Suggerimento: split("") + for al contrario + join("").
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function invertiStringa(testo) {
    let lettere = testo.split("");
    let risultato = [];

    for (let i = lettere.length - 1; i >= 0; i--) {
        risultato.push(lettere[i]);
    }

    return risultato.join("");
}

console.log(invertiStringa("EPICODE"));
console.log(invertiStringa("JavaScript"));

/* ESERCIZIO 8 — inizialiMaiuscole
   Funzione inizialiMaiuscole(frase): metti in maiuscolo la prima lettera di ogni parola.
   "ciao mondo" → "Ciao Mondo".
   Suggerimento: split(" ") + for + slice(0,1).toUpperCase() + slice(1) + join(" ").
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function inizialiMaiuscole(frase) {
    let parole = frase.split(" ");

    for (let i = 0; i < parole.length; i++) {
        parole[i] = parole[i].slice(0, 1).toUpperCase() + parole[i].slice(1);
    }

    return parole.join(" ");
}

console.log(inizialiMaiuscole("ciao mondo"));
console.log(inizialiMaiuscole("sto imparando javascript"));

/* ESERCIZIO 9 — togliPrimoEUltimo
   Funzione togliPrimoEUltimo(testo): rimuovi primo e ultimo carattere.
   Usa slice. Prova con "EPICODE".
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function togliPrimoEUltimo(testo) {
    return testo.slice(1, -1);
}

console.log(togliPrimoEUltimo("EPICODE"));
console.log(togliPrimoEUltimo("JavaScript"));

/* ESERCIZIO 10 — dammiCasuali
   Funzione dammiCasuali(n): ritorna un array di n numeri interi casuali tra 0 e 10 (inclusi).
   Usa Math.random e Math.floor.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function dammiCasuali(n) {
    let numeri = [];

    for (let i = 0; i < n; i++) {
        let casuale = Math.floor(Math.random() * 11);
        numeri.push(casuale);
    }

    return numeri;
}

console.log(dammiCasuali(5));
console.log(dammiCasuali(10));

/* --EXTRA-- ESERCIZIO 11 — etaInGiorni
   Funzione etaInGiorni(annoNascita, meseNascita, giornoNascita).
   Ritorna l'età in giorni rispetto a oggi.
   - new Date() per oggi
   - new Date(anno, mese - 1, giorno) per la nascita (mese 0-based!)
   - oggi - nascita = millisecondi
   - dividi per 1000 * 60 * 60 * 24 e Math.floor per i giorni interi
   Stampa: "Hai X giorni!"
*/

/* SCRIVI QUI LA TUA RISPOSTA */

function etaInGiorni(annoNascita, meseNascita, giornoNascita) {
    let oggi = new Date();
    let nascita = new Date(annoNascita, meseNascita - 1, giornoNascita);

    let millisecondi = oggi - nascita;

    let giorni = Math.floor(millisecondi / (1000 * 60 * 60 * 24));

    return "Hai " + giorni + " giorni!";
}

console.log(etaInGiorni(1995, 9, 14));
