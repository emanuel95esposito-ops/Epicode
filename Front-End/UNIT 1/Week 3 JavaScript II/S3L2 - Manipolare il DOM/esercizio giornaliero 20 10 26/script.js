/*
  REGOLE
  - Continua quello che hai iniziato stamani in classe.
  - Niente eventi (li vediamo domani): chiama le funzioni dalla console o all'avvio.
  - Solo const/let, mai var. Solo querySelector/querySelectorAll per il DOM.
*/

/* SCRIVI QUI LE TUE FUNZIONI:
   1. Modifica aggiungiTask per accettare priorita
   2. Aggiungi bottone Elimina su ogni task
   6. evidenzia(indice) / togliEvidenza(indice)
   7. data automatica nel task
   8. contaPerPriorita()
*/

// VARIABILI E ARRAY
const lista = document.querySelector("#lista-task");
const contatore = document.querySelector("#contatore");

const tasks = [
    { testo: "Pagare le bollette", priorita: "alta" },
    { testo: "Studiare JavaScript", priorita: "media" },
    { testo: "Comprare il pane", priorita: "bassa" },
    { testo: "Chiamare il dentista", priorita: "alta" },
    { testo: "Riposarsi", priorita: "bassa" },
    { testo: "Andare in palestra", priorita: "media" },
    { testo: "Studiare HTML e CSS", priorita: "alta" }
];

let idProgressivo = 0;


// ESERCIZIO 1
function aggiungiTask(testo, priorita) {
    const task = document.createElement("li");
    task.classList.add("priorita-" + priorita);

    const spanTesto = document.createElement("span");
    spanTesto.textContent = testo;

    const badge = document.createElement("span");
    badge.classList.add("badge");
    badge.textContent = priorita.toUpperCase();

    const divData = document.createElement("div");
    divData.classList.add("divData");

    task.appendChild(spanTesto);
    task.appendChild(badge);
    task.appendChild(divData);

    aggiungiData(divData);
    aggiungiBottoneElimina(divData);

    lista.appendChild(task);

    contatore.textContent = lista.querySelectorAll("li").length;
}


// ESERCIZIO 2
function aggiungiBottoneElimina(divData) {
    const bottoneElimina = document.createElement("button");
    bottoneElimina.textContent = "Elimina";

    idProgressivo++;
    bottoneElimina.setAttribute("data-id", idProgressivo);

    divData.appendChild(bottoneElimina);
}


// ESERCIZIO 6
function evidenzia(indice) {
    const task = lista.querySelectorAll("li")[indice];

    if (task) {
        task.classList.add("evidenziato");
    }
}

function togliEvidenza(indice) {
    const task = lista.querySelectorAll("li")[indice];

    if (task) {
        task.classList.remove("evidenziato");
    }
}


// ESERCIZIO 7 - Data automatica nel task
function aggiungiData(divData) {
    const data = document.createElement("span");
    data.classList.add("data");
    data.textContent = new Date().toLocaleString("it-IT");

    divData.appendChild(data);
}


// ESERCIZIO 8 - Conta i task per priorità
function contaPerPriorita() {
    return {
        alta: lista.querySelectorAll(".priorita-alta").length,
        media: lista.querySelectorAll(".priorita-media").length,
        bassa: lista.querySelectorAll(".priorita-bassa").length
    };
}


// ESECUZIONE INIZIALE
for (const elemento of tasks) {
    aggiungiTask(elemento.testo, elemento.priorita);
}

evidenzia(1);

console.log(contaPerPriorita());