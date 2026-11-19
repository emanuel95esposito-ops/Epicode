import { Libro, LibroDigitale, LibroAudio } from "./classes.js";
import { mostraSpinner, nascondiSpinner, mostraErrore, renderRisultati } from "./render.js";

// === Chiamate HTTP ===

export async function getJSON(url, opzioni) {
    const risposta = await fetch(url, opzioni);

    if (!risposta.ok) {
        const err = new Error(`HTTP ${risposta.status}`);
        err.status = risposta.status;
        throw err;
    }

    return risposta.json();
}

// === Stato e persistenza ===

const STORAGE_KEY = "libri";

export let libri = caricaLibri();
export let filtroAttivo = "tutti";
export let ordinamentoAttivo = "titolo";

export function setLibri(nuovi) {
    libri = nuovi;
}

export function setFiltro(nuovo) {
    filtroAttivo = nuovo;
}

export function setOrdinamento(nuovo) {
    ordinamentoAttivo = nuovo;
}

export function salvaLibri() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(libri));
}

export function svuotaArchivio() {
    libri = [];
    localStorage.removeItem(STORAGE_KEY);
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

// === Ricerca su Open Library ===

export const RICERCA_KEY = "ultimaRicercaOpenLibrary";

let controller;
let timeoutId;

export function annullaRicerca() {
    clearTimeout(timeoutId);
    controller?.abort();
}

export function pianificaRicerca(query) {
    timeoutId = setTimeout(() => {
        localStorage.setItem(RICERCA_KEY, query);
        cerca(query);
    }, 400);
}

export async function cerca(query) {
    controller?.abort();
    controller = new AbortController();

    const { signal } = controller;

    mostraSpinner();

    const url = new URL("https://openlibrary.org/search.json");

    url.searchParams.set("q", query);
    url.searchParams.set("limit", 10);

    try {
        const dati = await getJSON(url, { signal });

        renderRisultati(dati.docs, libri);
    } catch (err) {
        if (err.name === "AbortError") return;

        mostraErrore(`Errore durante la ricerca: ${err.message}`);
    } finally {
        if (!signal.aborted) {
            nascondiSpinner();
        }
    }
}
