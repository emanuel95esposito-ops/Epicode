// Mini-libreria — Settimana VII Giorno I
//
// Devi fare 4 cose:
// 1. Definire una classe Libro (titolo, autore, anno, letto)
// 2. Definire una classe LibroDigitale che estende Libro (aggiunge formato, dimensioneMb)
// 3. Aggiungere un listener al form che crea una nuova istanza e la aggiunge all'array
// 4. Renderizzare la lista nel <ul id="lista-libri"> via innerHTML
//
// Bonus: bottone "Segna come letto" su ogni elemento, gestito con event delegation.


// === Classi ===

class Libro {
    #id;
    letto = false;

    constructor(_titolo, _autore, _anno) {
        this.#id = crypto.randomUUID();
        this.titolo = _titolo;
        this.autore = _autore;
        this.anno = _anno;
    }

    getId() {
        return this.#id;
    }

    segnaComeLetto() {
        this.letto = true;
    }

    formato() {
        return "cartaceo";
    }
}

class LibroDigitale extends Libro {
    constructor(_titolo, _autore, _anno, _dimensioneMb) {
        super(_titolo, _autore, _anno);
        this.dimensioneMb = _dimensioneMb;
    }

    formato() {
        return `digitale (${this.dimensioneMb} MB)`;
    }
}


// === Stato (array di libri) ===

const libri = [];



// === Render ===

function creaElemento(tag, classe, genitore, testo, id) {
    const elemento = document.createElement(tag);
    elemento.className = classe;

    if (testo !== undefined) {
        elemento.textContent = testo;
    }

    if (id !== undefined) {
        elemento.id = id;
    }

    if (genitore !== undefined) {
        genitore.appendChild(elemento);
    }

    return elemento;
}

function renderLibri() {
    const listaLibri = document.getElementById("lista-libri");
    const contatore = document.getElementById("contatore");
    const righe = [];

    libri.forEach((libro) => {
        const li = creaElemento("li", libro.letto ? "letto" : "");
        li.dataset.id = libro.getId();

        const info = creaElemento("div", "info", li);
        creaElemento("strong", "", info, libro.titolo);
        creaElemento("span", "badge", info, libro.formato());
        creaElemento("div", "meta", info, `${libro.autore} — ${libro.anno}`);

        const azioni = creaElemento("div", "azioni", li);

        if (libro.letto) {
            creaElemento("span", "stato-letto", azioni, "✓ letto");
        } else {
            const bottone = creaElemento("button", "", azioni, "Segna come letto");
            bottone.type = "button";
            bottone.dataset.azione = "leggi";
        }

        righe.push(li);
    });

    listaLibri.replaceChildren(...righe);
    contatore.textContent = libri.length;
}


// === Eventi ===

const formatoSelect = document.getElementById("formato");
const campoDimensione = document.getElementById("campo-dimensione");
const formAggiungiLibro = document.getElementById("aggiungi-libro");
const listaLibri = document.getElementById("lista-libri");

formatoSelect.addEventListener("change", (e) => {
    campoDimensione.hidden = e.target.value !== "digitale";
});


formAggiungiLibro.addEventListener("submit", (e) => {
    e.preventDefault();

    const dati = Object.fromEntries(new FormData(e.target));

    const nuovoLibro = dati.formato === "digitale"
        ? new LibroDigitale(dati.titolo, dati.autore, Number(dati.anno), Number(dati.dimensioneMb))
        : new Libro(dati.titolo, dati.autore, Number(dati.anno));

    libri.push(nuovoLibro);
    renderLibri();

    e.target.reset();
    campoDimensione.hidden = true;
});

listaLibri.addEventListener("click", (e) => {
    const bottone = e.target.closest("[data-azione='leggi']");

    if (!bottone) return;

    const id = bottone.closest("li").dataset.id;

    const libro = libri.find((libro) => libro.getId() === id);

    if (!libro) return;

    libro.segnaComeLetto();
    renderLibri();
});
