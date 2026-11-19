// Mini-libreria — Settimana VII Giorno I
//
// Devi fare 4 cose:
// 1. Definire una classe Libro (titolo, autore, anno, letto)
// 2. Definire una classe LibroDigitale che estende Libro (aggiunge formato, dimensioneMb)
// 3. Aggiungere un listener al form che crea una nuova istanza e la aggiunge all'array
// 4. Renderizzare la lista nel <ul id="lista-libri"> via innerHTML
//
// Bonus: bottone "Segna come letto" su ogni elemento, gestito con event delegation.


import { Libro, LibroDigitale, LibroAudio } from "../import/classes.js";
import {
    renderLibri, nascondiSpinner,
    formatoSelect, formAggiungiLibro, listaLibri, svuotaTutto, esportaJSON,
    dimensioneInput, campoDimensione, durataInput, campoDurata,
    filtri, ordinamentoSelect, errore, cercaInput, risultatiRicerca
} from "../import/render.js";
import {
    libri, filtroAttivo, ordinamentoAttivo,
    salvaLibri, setLibri, setFiltro, setOrdinamento, svuotaArchivio,
    getJSON, cerca, annullaRicerca, pianificaRicerca, RICERCA_KEY
} from "../import/functions.js";
import { getToken, renderAuthBox, mostraProfilo } from "../../auth/auth.js";


// === Aggiornamento della lista ===

function aggiornaLista() {
    renderLibri(libri, filtroAttivo, ordinamentoAttivo);
}


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
    aggiornaLista();

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
        setLibri(libri.filter((libro) => libro.getId() !== id));

    } else {
        return;
    }

    salvaLibri();
    aggiornaLista();
});

svuotaTutto.addEventListener("click", () => {
    svuotaArchivio();
    aggiornaLista();
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

    setFiltro(bottone.dataset.filtro);

    filtri.querySelectorAll("[data-filtro]").forEach((btn) => {
        const attivo = btn.dataset.filtro === filtroAttivo;

        btn.classList.toggle("btn-primary", attivo);
        btn.classList.toggle("btn-outline-secondary", !attivo);
    });

    aggiornaLista();
});

ordinamentoSelect.addEventListener("change", (e) => {
    setOrdinamento(e.target.value);
    aggiornaLista();
});


cercaInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();

    annullaRicerca();

    risultatiRicerca.replaceChildren();
    errore.hidden = true;

    if (query.length < 3) {
        localStorage.removeItem(RICERCA_KEY);
        nascondiSpinner();
        return;
    }

    pianificaRicerca(query);
});

risultatiRicerca.addEventListener("click", async (e) => {

    const bottoneDettagli = e.target.closest("button[data-key]");

    if (bottoneDettagli) {
        const url = `https://openlibrary.org${bottoneDettagli.dataset.key}.json`;

        try {
            const dati = await getJSON(url);

            const descrizione = typeof dati.description === "string"
                ? dati.description
                : dati.description?.value ?? "Nessuna descrizione disponibile.";

            alert(descrizione);
        } catch (err) {
            alert(`Errore nel caricamento dei dettagli: ${err.message}`);
        }

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
    aggiornaLista();

    bottone.textContent = "✓ Aggiunto";
    bottone.disabled = true;
});


// === Inizializzazione ===

async function avvio() {
    aggiornaLista();

    const ultimaRicerca = localStorage.getItem(RICERCA_KEY);

    if (ultimaRicerca) {
        cercaInput.value = ultimaRicerca;
    }

    const compiti = [];

    if (getToken()) {
        compiti.push(mostraProfilo());
    }

    if (ultimaRicerca) {
        compiti.push(cerca(ultimaRicerca));
    }

    await Promise.allSettled(compiti);

    renderAuthBox();
}

avvio();
