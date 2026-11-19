// === Elementi della pagina ===

export const dimensioneInput = document.querySelector("#dimensioneMb");
export const formatoSelect = document.querySelector("#formato");
export const campoDimensione = document.querySelector("#campo-dimensione");
export const formAggiungiLibro = document.querySelector("#aggiungi-libro");
export const listaLibri = document.querySelector("#lista-libri");
export const contatore = document.querySelector("#contatore");
export const svuotaTutto = document.querySelector("#svuota-tutto");
export const durataInput = document.querySelector("#durataMinuti");
export const campoDurata = document.querySelector("#campo-durata");
export const esportaJSON = document.querySelector("#esporta-json");
export const filtri = document.querySelector(".filtri");
export const ordinamentoSelect = document.querySelector("#ordina-libri");
export const spinner = document.querySelector("#spinner");
export const errore = document.querySelector("#errore");
export const cercaInput = document.querySelector("#cerca");
export const risultatiRicerca = document.querySelector("#risultati");
export const authBox = document.querySelector("#auth-box");
export const profiloSection = document.querySelector("#profilo-section");
export const profiloContenuto = document.querySelector("#profilo-contenuto");

// === Helper per creare elementi ===

export function creaElemento(tag, classe, genitore, testo, id) {
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

// === Spinner e messaggi ===

export function mostraSpinner() {
    spinner.hidden = false;
    errore.hidden = true;
}

export function nascondiSpinner() {
    spinner.hidden = true;
}

export function mostraErrore(msg) {
    errore.textContent = msg;
    errore.hidden = false;
}

// === Lista dei libri salvati ===

export function renderLibri(libri, filtroAttivo, ordinamentoAttivo) {
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

// === Risultati della ricerca ===

export function renderRisultati(docs, libri) {
    const libriConAutore = docs.filter((libro) =>
        libro.author_name?.length > 0
    );

    if (libriConAutore.length === 0) {
        const li = creaElemento("li", "", undefined, "Nessun risultato.");
        risultatiRicerca.replaceChildren(li);
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

    risultatiRicerca.replaceChildren(...righe);
}
