# EpiShop — E-commerce

Progetto e-commerce responsive sviluppato durante la **Week 6 di EPICODE**, utilizzando HTML, Bootstrap 5, SASS (SCSS) e JavaScript.

Il progetto è stato realizzato progressivamente, partendo da un layout Bootstrap e aggiungendo componenti dinamici, personalizzazione grafica, temi chiaro/scuro e filtri per categoria.

## Funzionalità

- **Layout responsive:** Navbar, carousel automatico, griglia prodotti e footer.
- **Navbar sticky:** rimane visibile durante lo scorrimento della pagina.
- **Light/Dark Mode:** cambio tema tramite pulsante e gestione degli stili con SASS.
- **6 prodotti dinamici:** card generate tramite JavaScript senza utilizzare `innerHTML`.
- **Categorie personalizzate:** Scarpe (blu), Abbigliamento (rosso) e Accessori (giallo).
- **Filtri responsive:** pulsanti su mobile/tablet e sidebar interattiva da 992px.
- **Event Delegation:** gestione dei filtri tramite un unico listener.
- **Modal Bootstrap:** visualizzazione dei dettagli del prodotto selezionato, con bordo colorato in base alla categoria.
- **Contatore dinamico:** mostra il numero di prodotti visualizzati.
- **Totale catalogo:** calcolato tramite `reduce()`.
- **Footer:** posizionato in fondo alla pagina anche quando il contenuto è ridotto.

## Tecnologie utilizzate

- HTML5
- Bootstrap 5.3.8
- SASS / SCSS
- JavaScript ES6
- DOM API

## Struttura del progetto

```text
esercizio-giornaliero/
├── index.html
├── assets/
│   ├── scss/
│   │   ├── style.scss
│   │   └── _colors.scss
│   ├── css/
│   │   ├── style.css
│   │   └── style.css.map
│   └── js/
│       └── script.js
└── README.md
```

## Compilazione SASS

Per compilare automaticamente le modifiche SCSS, eseguire dalla cartella principale del progetto:

```bash
sass --watch assets/scss/style.scss assets/css/style.css
```

Il file `_colors.scss` contiene le variabili dei colori e delle ombre, mentre `style.scss` gestisce mixin, nesting, temi e personalizzazioni Bootstrap.

## Gestione JavaScript

Le card vengono create dinamicamente attraverso `createElement()`, `appendChild()` e la funzione riutilizzabile `renderProdotti(lista)`.

I filtri utilizzano `data-categoria`, `closest()` e `filter()` per aggiornare i prodotti visualizzati.

Il sistema di Event Delegation permette di gestire sia i pulsanti mobile/tablet sia le categorie della sidebar desktop con un unico listener.

Il contenitore dei prodotti viene aggiornato tramite `replaceChildren()`, senza utilizzare `innerHTML`.

Il totale del catalogo viene calcolato con `reduce()`.

## Obiettivo didattico

Approfondire l'utilizzo di Bootstrap e SASS, sviluppando un'interfaccia responsive e consolidando la gestione dinamica del DOM, degli eventi e degli array JavaScript.

---

**EPICODE — Week 6 | Front-End Development**