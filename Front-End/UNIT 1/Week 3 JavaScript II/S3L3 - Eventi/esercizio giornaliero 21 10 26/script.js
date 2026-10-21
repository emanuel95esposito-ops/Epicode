/*
  REGOLE
  - Solo const/let, mai var.
  - DOM con querySelector / querySelectorAll.
  - Eventi con addEventListener (mai onclick inline nell'HTML).
*/

let tasks = [];
// Ogni task: { id: number, testo: string, completato: boolean }

let filtro = "tutti"; // "tutti" | "attivi" | "completati"


/* SCRIVI QUI LE TUE FUNZIONI E I TUOI LISTENER:
   1. Listener sul submit di #form-task (preventDefault, validazione, push, render)
   2. Funzione renderLista() (filtra, crea <li>, aggiorna contatore)
   3. Listener su #lista-task con event delegation (Elimina + checkbox)
   4. Listener sui button .filtri (cambia filtro, classe attivo, render)
   EXTRA: localStorage per persistenza
*/


const lista = document.querySelector('#lista-task');
const contatore = document.querySelector('#contatore');
const formTask = document.querySelector('#form-task');
const campoTask = document.querySelector('#campo-task');
const errore = document.querySelector('#errore');
const bottoniFiltro = document.querySelectorAll('.filtri button');

// TASK DELL'ESERCIZIO PRECEDENTE
tasks.push(
    {
        id: 1,
        testo: 'Pagare le bollette',
        priorita: 'alta',
        data: new Date(),
        completato: false,
        evidenziato: false
    },
    {
        id: 2,
        testo: 'Studiare JavaScript',
        priorita: 'media',
        data: new Date(),
        completato: false,
        evidenziato: true
    },
    {
        id: 3,
        testo: 'Comprare il pane',
        priorita: 'bassa',
        data: new Date(),
        completato: false,
        evidenziato: false
    },
    {
        id: 4,
        testo: 'Chiamare il dentista',
        priorita: 'alta',
        data: new Date(),
        completato: false,
        evidenziato: false
    },
    {
        id: 5,
        testo: 'Riposarsi',
        priorita: 'bassa',
        data: new Date(),
        completato: false,
        evidenziato: false
    },
    {
        id: 6,
        testo: 'Andare in palestra',
        priorita: 'media',
        data: new Date(),
        completato: false,
        evidenziato: false
    },
    {
        id: 7,
        testo: 'Studiare HTML e CSS',
        priorita: 'alta',
        data: new Date(),
        completato: false,
        evidenziato: false
    }
);

let prossimoId = 1;

tasks.forEach((task) => {
    if (task.id >= prossimoId) {
        prossimoId = task.id + 1;
    }
});


// ESERCIZIO 1 - Listener sul submit di #form-task (preventDefault, validazione, push, render)
formTask.addEventListener('submit', (e) => {
    e.preventDefault();

    const testo = campoTask.value.trim();

    if (testo === '') {
        errore.textContent = 'Scrivi un’attività prima di aggiungerla.';
        return;
    }

    errore.textContent = '';

    tasks.push({
        id: prossimoId,
        testo: testo,
        priorita: 'media',
        data: new Date(),
        completato: false,
        evidenziato: false
    });

    prossimoId++;
    campoTask.value = '';
    salvaTask();
    renderLista();
});


// ESERCIZIO 2 - Funzione renderLista() (filtra, crea <li>, aggiorna contatore)
function renderLista() {
    lista.textContent = '';

    let taskVisibili = tasks;

    if (filtro === 'attivi') {
        taskVisibili = tasks.filter((task) => !task.completato);
    } else if (filtro === 'completati') {
        taskVisibili = tasks.filter((task) => task.completato);
    }

    taskVisibili.forEach((task) => {
        const newLi = document.createElement('li');
        newLi.classList.add(`priorita-${task.priorita}`);
        newLi.setAttribute('data-id', task.id);

        if (task.evidenziato) {
            newLi.classList.add('evidenziato');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox-task');
        checkbox.checked = task.completato;
        checkbox.setAttribute('data-id', task.id);
        newLi.appendChild(checkbox);

        const textSpan = document.createElement('span');
        textSpan.classList.add('testo-task');
        textSpan.textContent = task.testo;

        if (task.completato) {
            textSpan.classList.add('completato');
        }

        newLi.appendChild(textSpan);

        const badge = document.createElement('span');
        badge.classList.add('badge');
        badge.textContent = task.priorita;
        newLi.appendChild(badge);

        const divData = document.createElement('div');
        divData.classList.add('divData');

        const taskDate = document.createElement('span');
        taskDate.classList.add('data');
        taskDate.textContent = new Date(task.data).toLocaleString('it-IT');
        divData.appendChild(taskDate);

        const elimina = document.createElement('button');
        elimina.type = 'button';
        elimina.classList.add('elimina');
        elimina.textContent = 'Elimina';
        elimina.setAttribute('data-id', task.id);
        divData.appendChild(elimina);

        newLi.appendChild(divData);
        lista.appendChild(newLi);
    });

    aggiornaContatore();
}

function aggiornaContatore() {
    contatore.textContent = tasks.filter((task) => !task.completato).length;
}


// ESERCIZIO 3 - Listener su #lista-task con event delegation (Elimina + checkbox)
lista.addEventListener('click', (e) => {
    const id = Number(e.target.getAttribute('data-id'));

    if (e.target.tagName === 'BUTTON') {
        tasks = tasks.filter((task) => task.id !== id);
        salvaTask();
        renderLista();
    } else if (e.target.type === 'checkbox') {
        const task = tasks.find((elemento) => elemento.id === id);

        if (task) {
            task.completato = e.target.checked;
            salvaTask();
            renderLista();
        }
    }
});


// ESERCIZIO 4 - Listener sui button .filtri (cambia filtro, classe attivo, render)
bottoniFiltro.forEach((bottone) => {
    bottone.addEventListener('click', () => {
        filtro = bottone.getAttribute('data-filtro');

        bottoniFiltro.forEach((altroBottone) => {
            altroBottone.classList.remove('attivo');
        });

        bottone.classList.add('attivo');
        renderLista();
    });
});


// Funzioni del vecchio esercizio
function evidenzia(indice) {
    const riga = lista.querySelectorAll('li')[indice];

    if (riga) {
        const id = Number(riga.getAttribute('data-id'));
        const task = tasks.find((elemento) => elemento.id === id);

        if (task) {
            task.evidenziato = true;
            salvaTask();
            renderLista();
        }
    }
}

function togliEvidenza(indice) {
    const riga = lista.querySelectorAll('li')[indice];

    if (riga) {
        const id = Number(riga.getAttribute('data-id'));
        const task = tasks.find((elemento) => elemento.id === id);

        if (task) {
            task.evidenziato = false;
            salvaTask();
            renderLista();
        }
    }
}

function contaPerPriorita() {
    const conteggio = { alta: 0, media: 0, bassa: 0 };

    tasks.forEach((task) => {
        conteggio[task.priorita]++;
    });

    return conteggio;
}

/* EXTRA: localStorage per persistenza */

// Salva i task nel browser
function salvaTask() {
    localStorage.setItem('task-manager-epicode', JSON.stringify(tasks));
}

// Recupera i task salvati
function caricaTask() {
    const taskSalvati = localStorage.getItem('task-manager-epicode');

    if (taskSalvati !== null) {
        tasks = JSON.parse(taskSalvati);

        prossimoId = 1;

        tasks.forEach((task) => {
            if (task.id >= prossimoId) {
                prossimoId = task.id + 1;
            }
        });
    }
}

// Ripristina i sette task iniziali: Scrivere in Console --> ripristinaTask(); 
function ripristinaTask() {
    localStorage.removeItem('task-manager-epicode');
    location.reload();
}


// AVVIO DEL PROGRAMMA
caricaTask();

console.log(contaPerPriorita());

renderLista();