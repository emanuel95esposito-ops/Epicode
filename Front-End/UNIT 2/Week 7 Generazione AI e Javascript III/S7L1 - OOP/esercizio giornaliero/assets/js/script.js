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

    toJSON() {
        return {
            ...this,
            id: this.#id
        };
    }

    static fromJSON(dati) {
        const libro = new this(
            dati.titolo,
            dati.autore,
            dati.anno,
            dati.dimensioneMb ?? dati.durataMinuti
        );

        if (dati.id) {
            libro.#id = dati.id;
        }

        libro.letto = dati.letto === true;

        return libro;
    }

    static daStringa(s) {
        const [titolo, autore, anno] = s.split("|");

        return new Libro(titolo, autore, Number(anno));
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


class LibroAudio extends Libro {
    constructor(_titolo, _autore, _anno, _durataMinuti) {
        super(_titolo, _autore, _anno);
        this.durataMinuti = _durataMinuti;
    }

    formato() {
        return `audio (${this.durataMinuti} min)`;
    }
}



// === Configurazione ===

const STORAGE_KEY = "libri";
const RICERCA_KEY = "ultimaRicercaOpenLibrary";


// === Stato (array di libri) ===

let libri = caricaLibri();
let filtroAttivo = "tutti";
let ordinamentoAttivo = "titolo";

// === Persistenza ===

function salvaLibri() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(libri));
}


function caricaLibri() {
    const dati = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");

    return dati.map((libro) => {
        if (libro.durataMinuti !== undefined) {
            return LibroAudio.fromJSON(libro);
        }

        if (libro.dimensioneMb !== undefined) {
            return LibroDigitale.fromJSON(libro);
        }

        return Libro.fromJSON(libro);
    });
}



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
    const libriFiltrati = libri.filter((libro) => {
        if (filtroAttivo === "letti") {
            return libro.letto;
        }

        if (filtroAttivo === "da-leggere") {
            return !libro.letto;
        }

        return true;
    });
    const libriOrdinati = libriFiltrati.toSorted((a, b) => {
        if (ordinamentoAttivo === "titolo") {
            return a.titolo.localeCompare(b.titolo, "it");
        }

        return a.anno - b.anno || a.titolo.localeCompare(b.titolo, "it");
    });

    libriOrdinati.forEach((libro) => {
        const li = creaElemento("li", libro.letto ? "letto" : "");
        li.dataset.id = libro.getId();

        const info = creaElemento("div", "info", li);
        creaElemento("strong", "", info, libro.titolo);
        creaElemento("span", "badge rounded-pill text-bg-light ms-2", info, libro.formato());
        creaElemento("div", "meta", info, `${libro.autore} — ${libro.anno}`);

        const azioni = creaElemento("div", "azioni d-flex align-items-center gap-2", li);

        if (libro.letto) {
            creaElemento("span", "stato-letto", azioni, "✓ letto");
        } else {
            const bottone = creaElemento("button", "btn btn-outline-secondary btn-sm", azioni, "Segna come letto");
            bottone.type = "button";
            bottone.dataset.azione = "leggi";
        }

        const bottoneRimuovi = creaElemento("button", "btn btn-outline-secondary btn-sm", azioni, "Rimuovi");
        bottoneRimuovi.type = "button";
        bottoneRimuovi.dataset.azione = "rimuovi";

        righe.push(li);
    });

    listaLibri.replaceChildren(...righe);
    contatore.textContent = libri.length;

    risultatiRicerca.querySelectorAll("button[data-titolo]").forEach((bottone) => {
        const presente = libri.some((libro) =>
            libro.titolo === bottone.dataset.titolo &&
            libro.autore === bottone.dataset.autore &&
            libro.anno === (Number(bottone.dataset.anno) || 0)
        );

        bottone.textContent = presente ? "✓ Aggiunto" : "Aggiungi";
        bottone.disabled = presente;
    });
}

// === Ricerca Open Library ===

let controller;
let timeoutId;

function mostraSpinner() {
    spinner.hidden = false;
    errore.hidden = true;
}

function nascondiSpinner() {
    spinner.hidden = true;
}

function mostraErrore(msg) {
    errore.textContent = msg;
    errore.hidden = false;
}

function cerca(query) {
    controller?.abort();
    controller = new AbortController();

    const { signal } = controller;

    mostraSpinner();

    const url = new URL("https://openlibrary.org/search.json");

    url.searchParams.set("q", query);
    url.searchParams.set("limit", 10);

    fetch(url, { signal })
        .then((risposta) => {
            if (!risposta.ok) {
                throw new Error(`HTTP ${risposta.status}`);
            }

            return risposta.json();
        })
        .then((dati) => {
            renderRisultati(dati.docs);
        })
        .catch((err) => {
            if (err.name === "AbortError") return;

            mostraErrore(`Errore durante la ricerca: ${err.message}`);
        })
        .finally(() => {
            if (!signal.aborted) {
                nascondiSpinner();
            }
        });
}


function renderRisultati(docs) {
    const risultati = document.getElementById("risultati");
    const libriConAutore = docs.filter((libro) =>
        libro.author_name?.length > 0
    );

    if (libriConAutore.length === 0) {
        const li = creaElemento("li", "", undefined, "Nessun risultato.");
        risultati.replaceChildren(li);
        return;
    }

    const righe = libriConAutore.map((libro) => {
        const autore = libro.author_name?.[0] ?? "Autore sconosciuto";
        const anno = libro.first_publish_year ?? "?";

        const li = creaElemento("li", "risultato");

        const info = creaElemento("div", "info", li);
        creaElemento("strong", "", info, libro.title);
        creaElemento("div", "meta", info, `${autore} — ${anno}`);

        const bottone = creaElemento("button", "btn btn-success btn-sm", li, "Aggiungi");
        bottone.type = "button";
        bottone.dataset.titolo = libro.title;
        bottone.dataset.autore = autore;
        bottone.dataset.anno = anno;

        const presente = libri.some((l) =>
            l.titolo === libro.title &&
            l.autore === autore &&
            l.anno === (Number(anno) || 0)
        );

        bottone.textContent = presente ? "✓ Aggiunto" : "Aggiungi";
        bottone.disabled = presente;

        const dettagli = creaElemento("button", "btn btn-outline-primary btn-sm", li, "Dettagli");
        dettagli.type = "button";
        dettagli.dataset.key = libro.key;

        return li;
    });

    risultati.replaceChildren(...righe);
}


// === Elementi DOM ===

const dimensioneInput = document.getElementById("dimensioneMb");
const formatoSelect = document.getElementById("formato");
const campoDimensione = document.getElementById("campo-dimensione");
const formAggiungiLibro = document.getElementById("aggiungi-libro");
const listaLibri = document.getElementById("lista-libri");
const svuotaTutto = document.getElementById("svuota-tutto");
const durataInput = document.getElementById("durataMinuti");
const campoDurata = document.getElementById("campo-durata");
const esportaJSON = document.getElementById("esporta-json");
const filtri = document.querySelector(".filtri");
const ordinamentoSelect = document.getElementById("ordina-libri");
const spinner = document.getElementById("spinner");
const errore = document.getElementById("errore");
const cercaInput = document.getElementById("cerca");
const risultatiRicerca = document.getElementById("risultati");

// === Eventi ===

formatoSelect.addEventListener("change", (e) => {
    const isDigitale = e.target.value === "digitale";
    const isAudio = e.target.value === "audio";

    campoDimensione.hidden = !isDigitale;
    dimensioneInput.required = isDigitale;

    campoDurata.hidden = !isAudio;
    durataInput.required = isAudio;
});


formAggiungiLibro.addEventListener("submit", (e) => {
    e.preventDefault();

    const dati = Object.fromEntries(new FormData(e.target));

    let nuovoLibro;

    if (dati.formato === "digitale") {
        nuovoLibro = new LibroDigitale(
            dati.titolo,
            dati.autore,
            Number(dati.anno),
            Number(dati.dimensioneMb)
        );
    } else if (dati.formato === "audio") {
        nuovoLibro = new LibroAudio(
            dati.titolo,
            dati.autore,
            Number(dati.anno),
            Number(dati.durataMinuti)
        );
    } else {
        nuovoLibro = new Libro(
            dati.titolo,
            dati.autore,
            Number(dati.anno)
        );
    }

    libri.push(nuovoLibro);
    salvaLibri();
    renderLibri();

    e.target.reset();
    campoDimensione.hidden = true;
    dimensioneInput.required = false;
    campoDurata.hidden = true;
    durataInput.required = false;
});

listaLibri.addEventListener("click", (e) => {
    const bottone = e.target.closest("[data-azione]");
    if (!bottone) return;

    const id = bottone.closest("li").dataset.id;
    const azione = bottone.dataset.azione;

    if (azione === "leggi") {
        const libro = libri.find((libro) => libro.getId() === id);
        if (!libro) return;
        libro.segnaComeLetto();

    } else if (azione === "rimuovi") {
        libri = libri.filter((libro) => libro.getId() !== id);

    } else {
        return;
    }

    salvaLibri();
    renderLibri();
});

svuotaTutto.addEventListener("click", () => {
    libri = [];
    localStorage.removeItem(STORAGE_KEY);
    renderLibri();
});


esportaJSON.addEventListener("click", () => {
    const json = JSON.stringify(libri, null, 2);

    const blob = new Blob([json], {   //window.open("data:application/json;charset=utf-8," + encodeURIComponent(json), "_blank");
        type: "application/json"      //questa versione viene bloccata da Chrome per motivi di sicurezza
    });

    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
});


filtri.addEventListener("click", (e) => {
    const bottone = e.target.closest("[data-filtro]");

    if (!bottone) return;

    filtroAttivo = bottone.dataset.filtro;

    filtri.querySelectorAll("[data-filtro]").forEach((btn) => {
        const attivo = btn.dataset.filtro === filtroAttivo;

        btn.classList.toggle("btn-primary", attivo);
        btn.classList.toggle("btn-outline-secondary", !attivo);
    });

    renderLibri();
});

ordinamentoSelect.addEventListener("change", (e) => {
    ordinamentoAttivo = e.target.value;
    renderLibri();
});


cercaInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();

    clearTimeout(timeoutId);
    controller?.abort();

    risultatiRicerca.replaceChildren();
    errore.hidden = true;

    if (query.length < 3) {
        localStorage.removeItem(RICERCA_KEY);
        nascondiSpinner();
        return;
    }

    timeoutId = setTimeout(() => {
        localStorage.setItem(RICERCA_KEY, query);
        cerca(query);
    }, 400);
});

risultatiRicerca.addEventListener("click", (e) => {

    const bottoneDettagli = e.target.closest("button[data-key]");

    if (bottoneDettagli) {
        const url = `https://openlibrary.org${bottoneDettagli.dataset.key}.json`;

        fetch(url)
            .then((risposta) => {
                if (!risposta.ok) {
                    throw new Error(`HTTP ${risposta.status}`);
                }

                return risposta.json();
            })
            .then((dati) => {
                const descrizione = typeof dati.description === "string"
                    ? dati.description
                    : dati.description?.value ?? "Nessuna descrizione disponibile.";

                alert(descrizione);
            })
            .catch((err) => {
                alert(`Errore nel caricamento dei dettagli: ${err.message}`);
            });

        return;
    }

    const bottone = e.target.closest("button[data-titolo]");

    if (!bottone) return;

    const titolo = bottone.dataset.titolo;
    const autore = bottone.dataset.autore;
    const anno = Number(bottone.dataset.anno) || 0;


    const presente = libri.some((libro) =>
        libro.titolo === titolo &&
        libro.autore === autore &&
        libro.anno === anno
    );

    if (presente) return;


    const nuovoLibro = new Libro(titolo, autore, anno);

    libri.push(nuovoLibro);
    salvaLibri();
    renderLibri();

    bottone.textContent = "✓ Aggiunto";
    bottone.disabled = true;
});


// === Inizializzazione ===

renderLibri();

const ultimaRicerca = localStorage.getItem(RICERCA_KEY);

if (ultimaRicerca) {
    cercaInput.value = ultimaRicerca;
    cerca(ultimaRicerca);
}
