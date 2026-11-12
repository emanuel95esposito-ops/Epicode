// ARRAY DEI PRODOTTI

const prodotti = [
    {
        id: 1,
        nome: "Sneaker Run",
        prezzo: "€ 89,00",
        categoria: "scarpe",
        descrizione: "Scarpa leggera per la corsa, suola in gomma traspirante.",
        descrizioneModal: "Scarpa leggera per la corsa, suola in gomma traspirante. Disponibile dal 36 al 46.",
        immagine: "https://placehold.co/300x180"
    },
    {
        id: 2,
        nome: "T-shirt basic",
        prezzo: "€ 19,00",
        categoria: "abbigliamento",
        descrizione: "Cotone biologico, taglio regolare, disponibile in 5 colori.",
        descrizioneModal: "Cotone biologico, taglio regolare, disponibile in 5 colori.",
        immagine: "https://placehold.co/300x180"
    },
    {
        id: 3,
        nome: "Borsa city",
        prezzo: "€ 49,00",
        categoria: "accessori",
        descrizione: "Borsa pratica e capiente, ideale per tutti i giorni.",
        descrizioneModal: "Borsa pratica e capiente, ideale per tutti i giorni.",
        immagine: "https://placehold.co/300x180"
    },
    {
        id: 4,
        nome: "Sandali estate",
        prezzo: "€ 39,00",
        categoria: "scarpe",
        descrizione: "Plantare anatomico, pelle vegana, perfetti per l'estate.",
        descrizioneModal: "Plantare anatomico, pelle vegana, perfetti per l'estate.",
        immagine: "https://placehold.co/300x180"
    },
    {
        id: 5,
        nome: "Felpa con cappuccio",
        prezzo: "€ 59,00",
        categoria: "abbigliamento",
        descrizione: "Tessuto morbido, tasca a marsupio, polsini elasticizzati.",
        descrizioneModal: "Tessuto morbido, tasca a marsupio, polsini elasticizzati.",
        immagine: "https://placehold.co/300x180"
    },
    {
        id: 6,
        nome: "Cappello sport",
        prezzo: "€ 14,00",
        categoria: "accessori",
        descrizione: "Visiera regolabile, traspirante, ideale per gli allenamenti.",
        descrizioneModal: "Visiera regolabile, traspirante, ideale per gli allenamenti.",
        immagine: "https://placehold.co/300x180"
    }
];


// SELEZIONE DEGLI ELEMENTI HTML

const listaProdotti = document.querySelector("#listaProdotti");
const titoloModal = document.querySelector("#modalProdottoLabel");
const immagineModal = document.querySelector("#imgProduct");
const descrizioneModal = document.querySelector("#description");
const prezzoModal = document.querySelector("#price");
const toggleTema = document.querySelector("#toggle-tema");
const areaFiltri = document.querySelector("main");
const contatore = document.querySelector("#contatore");
const totaleCatalogo = document.querySelector("#totaleCatalogo");
const modalContent = document.querySelector("#modalProdotto .modal-content");

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
    modalContent.classList.remove("scarpe", "abbigliamento", "accessori");
    modalContent.classList.add(prodottoSelezionato.categoria);
}

// CREAZIONE DINAMICA DELLE CARD

/**
 * Genera dinamicamente le card dei prodotti nella pagina.
 * @param {Array} lista - Array dei prodotti da visualizzare.
 */
function renderProdotti(lista) {
    listaProdotti.replaceChildren();

    contatore.textContent = lista.length;

    lista.forEach((articolo, i) => {
        const colonna = creaElemento("div", "col-12 col-md-6 col-xl-4", listaProdotti);

        const card = creaElemento("div", "card", colonna);
        card.classList.add(articolo.categoria);

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
}

renderProdotti(prodotti);

// CALCOLO TOTALE CATALOGO

// CALCOLO TOTALE CATALOGO

function calcolaTotale(lista) {
    const totale = lista.reduce((somma, articolo) => {
        return somma + parseFloat(articolo.prezzo.slice(2).replace(",", "."));
    }, 0);

    totaleCatalogo.textContent = "Totale catalogo: € " + totale.toFixed(2).replace(".", ",");
}

calcolaTotale(prodotti);

// FILTRI PER CATEGORIA - EVENT DELEGATION

areaFiltri.addEventListener("click", (e) => {
    const bottone = e.target.closest("[data-categoria]");

    if (!bottone) return;

    const categoria = bottone.dataset.categoria;

    areaFiltri.querySelectorAll("[data-categoria]").forEach((elemento) => {
        elemento.classList.remove("active");

        if (elemento.dataset.categoria === categoria) {
            elemento.classList.add("active");
        }
    });

    let prodottiFiltrati;

    if (categoria === "tutti") {
        prodottiFiltrati = prodotti;
    } else {
        prodottiFiltrati = prodotti.filter((articolo) => {
            return articolo.categoria === categoria;
        });
    }

    renderProdotti(prodottiFiltrati);
});

// CAMBIO TEMA CHIARO / SCURO

toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggleTema.textContent = "Tema chiaro";
    } else {
        toggleTema.textContent = "Tema scuro";
    }
});