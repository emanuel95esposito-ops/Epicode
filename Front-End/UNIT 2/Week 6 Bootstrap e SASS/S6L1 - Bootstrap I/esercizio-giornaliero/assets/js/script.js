// ARRAY DEI PRODOTTI

const prodotti = [
    {
        nome: "Sneaker Run",
        prezzo: "€ 89,00",
        descrizione: "Scarpa leggera per la corsa, suola in gomma traspirante.",
        descrizioneModal: "Scarpa leggera per la corsa, suola in gomma traspirante. Disponibile dal 36 al 46.",
        immagine: "https://placehold.co/300x180"
    },
    {
        nome: "T-shirt basic",
        prezzo: "€ 19,00",
        descrizione: "Cotone biologico, taglio regolare, disponibile in 5 colori.",
        descrizioneModal: "Cotone biologico, taglio regolare, disponibile in 5 colori.",
        immagine: "https://placehold.co/300x180"
    },
    {
        nome: "Borsa city",
        prezzo: "€ 49,00",
        descrizione: "Borsa pratica e capiente, ideale per tutti i giorni.",
        descrizioneModal: "Borsa pratica e capiente, ideale per tutti i giorni.",
        immagine: "https://placehold.co/300x180"
    }
];


// SELEZIONE DEGLI ELEMENTI HTML

const listaProdotti = document.querySelector("#listaProdotti");
const titoloModal = document.querySelector("#modalProdottoLabel");
const immagineModal = document.querySelector("#imgProduct");
const descrizioneModal = document.querySelector("#description");
const prezzoModal = document.querySelector("#price");

// FUNZIONE PER CREARE ELEMENTO

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

// FUNZIONE PER RIEMPIRE IL MODAL

function dettaglio(prodottoSelezionato) {
    titoloModal.textContent = prodottoSelezionato.nome;
    immagineModal.src = "https://placehold.co/600x300";
    immagineModal.alt = prodottoSelezionato.nome;
    descrizioneModal.textContent = prodottoSelezionato.descrizioneModal;
    prezzoModal.textContent = prodottoSelezionato.prezzo;
}

// CREAZIONE DINAMICA DELLE CARD

prodotti.forEach((articolo, i) => {
    const colonna = creaElemento("div", "col-12 col-md-6 col-xl-4", listaProdotti);

    const card = creaElemento("div", "card shadow-sm", colonna);

    const immagine = creaElemento("img", "card-img-top", card);
    immagine.src = articolo.immagine;
    immagine.alt = articolo.nome;

    const cardBody = creaElemento("div", "card-body", card);

    const titolo = creaElemento("h3", "card-title fs-5 fw-bold", cardBody, articolo.nome);

    const descrizione = creaElemento("p", "card-text text-muted", cardBody, articolo.descrizione);

    const prezzo = creaElemento("p", "fw-bold", cardBody, articolo.prezzo);

    const bottone = creaElemento("button", "btn btn-primary w-100", cardBody, "Dettagli");

    bottone.type = "button";
    bottone.setAttribute("data-bs-toggle", "modal");
    bottone.setAttribute("data-bs-target", "#modalProdotto");

    bottone.addEventListener("click", () => {
        dettaglio(articolo);
    });
});