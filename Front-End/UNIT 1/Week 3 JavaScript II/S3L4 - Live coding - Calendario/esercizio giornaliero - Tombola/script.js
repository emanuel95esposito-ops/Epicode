/*
  REGOLE
  - Solo const/let, mai var.
  - DOM con querySelector / querySelectorAll.
  - Eventi con addEventListener (mai onclick inline nell'HTML).
*/

let usciti = []; // array dei numeri già estratti


/* SCRIVI QUI LE TUE FUNZIONI E I TUOI LISTENER:
   1. rendiTabellone()  — crea 90 div, evidenzia i numeri usciti
   2. estrai()          — pesca un numero casuale tra i non usciti
   3. rendiCronologia() — mostra gli ultimi 10 estratti
   4. Listener click su #estrai e #reset
   EXTRA: conteggio, animazione di estrazione, localStorage
*/


// EXTRA - RECUPERO NUMERI SALVATI

usciti = JSON.parse(localStorage.getItem('tombolaUsciti')) || [];

let animazioneInCorso = false;


// ESERCIZIO 1 - RENDI TABELLONE

const rendiTabellone = () => {
  const tabellone = document.querySelector('#tabellone');

  tabellone.innerHTML = '';

  for (let i = 0; i < 90; i++) {
    const startNumber = i + 1;
    const numero = document.createElement('div');

    numero.classList.add('numero');
    numero.innerText = startNumber;

    if (usciti.includes(startNumber)) {
      numero.classList.add('uscito');
    }

    tabellone.appendChild(numero);
  }

  // EXTRA - CONTEGGIO
  const conteggio = document.querySelector('#conteggio');

  if (conteggio) {
    conteggio.innerText = usciti.length;
  }
};


// ESERCIZIO 2 - ESTRAZIONE NUMERI

const estrai = () => {
  if (animazioneInCorso) {
    return;
  }

  const disponibili = [];

  for (let i = 1; i <= 90; i++) {
    if (!usciti.includes(i)) {
      disponibili.push(i);
    }
  }

  if (disponibili.length === 0) {
    alert('Tutti i numeri sono usciti!');
    return;
  }

  const indiceCasuale = Math.floor(Math.random() * disponibili.length);
  const numeroEstratto = disponibili[indiceCasuale];

  const ultimoNumero = document.querySelector('#ultimo-numero');
  const bottoneEstrai = document.querySelector('#estrai');
  const bottoneReset = document.querySelector('#reset');

  // EXTRA - ANIMAZIONE
  animazioneInCorso = true;
  bottoneEstrai.disabled = true;
  bottoneReset.disabled = true;

  const animazione = setInterval(() => {
    ultimoNumero.innerText = Math.floor(Math.random() * 90) + 1;
  }, 50);

  setTimeout(() => {
    clearInterval(animazione);

    usciti.push(numeroEstratto);
    ultimoNumero.innerText = numeroEstratto;

    // EXTRA - SALVATAGGIO
    localStorage.setItem('tombolaUsciti', JSON.stringify(usciti));

    rendiTabellone();
    rendiCronologia();

    animazioneInCorso = false;
    bottoneEstrai.disabled = false;
    bottoneReset.disabled = false;
  }, 1000);
};


// ESERCIZIO 3 - CRONOLOGIA

const rendiCronologia = () => {
  const cronologia = document.querySelector('#cronologia');

  if (usciti.length === 0) {
    cronologia.innerText = 'Nessun numero estratto.';
    return;
  }

  const ultimiDieci = usciti.slice(-10).reverse();

  cronologia.innerText = ultimiDieci.join(', ');
};


// ESERCIZIO 4 - RESET

const reset = () => {
  if (animazioneInCorso) {
    return;
  }

  usciti = [];

  localStorage.removeItem('tombolaUsciti');

  document.querySelector('#ultimo-numero').innerText = '—';

  rendiTabellone();
  rendiCronologia();
};


// EVENT LISTENER

document.querySelector('#estrai').addEventListener('click', estrai);

document.querySelector('#reset').addEventListener('click', reset);


// AVVIO INIZIALE

rendiTabellone();
rendiCronologia();

if (usciti.length > 0) {
  document.querySelector('#ultimo-numero').innerText = usciti[usciti.length - 1];
}





