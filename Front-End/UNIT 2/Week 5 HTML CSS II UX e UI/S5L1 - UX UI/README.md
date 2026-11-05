# Portfolio Personale — Responsive Refactoring

Portfolio personale sviluppato durante il percorso **EPICODE — Full Stack AI Developer 2026**.

## Obiettivo

Realizzazione e miglioramento di un portfolio personale con approccio **mobile-first**, mantenendo la grafica originale e introducendo progressivamente nuove funzionalità, animazioni CSS e miglioramenti responsive.

---

## Aggiornamento 05/11/2026 — Animazioni CSS e miglioramenti UI

Durante la lezione EPICODE ho introdotto animazioni e transizioni CSS per rendere il portfolio più dinamico e migliorare l'esperienza utente.

### Animazioni CSS

- **Navigazione:** aggiunto un effetto hover con sollevamento dei pulsanti tramite `translateY()`.
- **Competenze:** aggiunte transizioni di colore e movimento alle chips.
- **Avatar:** introdotto un effetto hover con `scale()` e `rotate()`.
- **Card Progetti:** aggiunto un effetto di sollevamento e ombreggiatura tramite `transform` e `box-shadow`.
- **Badge NEW:** realizzata un'animazione continua di pulsazione tramite `@keyframes`.
- **Modale Contattami:** aggiunte animazioni `fadeIn` e `slideUp` durante l'apertura.
- **Torna in cima:** aggiunta l'animazione `pulseRing` con un alone che si espande attorno al pulsante.
- **Sezioni principali:** introdotta un'animazione di ingresso progressiva tramite `animation-delay`.
- **Pulsanti:** uniformati gli effetti hover dei pulsanti Scrivimi, Invia, Chiudi e Torna alla home.

### Navigazione e interattività

- Ottimizzato lo scorrimento tra le sezioni tramite `scroll-padding-top`.
- Mantenuto il comportamento sticky dell'header.
- Bloccato lo scroll della pagina durante l'apertura del modale utilizzando `classList.add()` e `classList.remove()`.
- Mantenuta la chiusura del modale tramite pulsante X, clic esterno e tasto Escape.
- Aggiunto il pulsante **Torna in cima** alle pagine `progetti.html` e `success.html`.
- Uniformati colori ed effetti hover dei collegamenti GitHub tra homepage e pagina Progetti.

### Pagina Progetti

- Introdotte animazioni di ingresso per le card.
- Aggiunti effetti hover con sollevamento e ombreggiatura.
- Uniformato lo stile dei link ai repository GitHub.
- Mantenuto il layout responsive.

### Pagina Success

- Realizzata una card dedicata al riepilogo dei dati inseriti nel form.
- Recuperati e visualizzati i dati tramite `localStorage` e JavaScript.
- Personalizzata la card con sfondo crema, bordo dorato e separatori.
- Aggiunta un'animazione di ingresso alla card.
- Mantenuta la coerenza grafica con il resto del portfolio.

### Accessibilità

- Implementata la media query `prefers-reduced-motion`.
- Disattivate animazioni e transizioni quando il dispositivo richiede una riduzione del movimento.
- Mantenuta la navigazione funzionante anche senza animazioni.

### Concetti approfonditi

- `transition`
- `transform`
- `translateY()`
- `scale()` e `rotate()`
- `@keyframes`
- `animation-delay`
- `animation-fill-mode`
- `box-shadow`
- `prefers-reduced-motion`
- `classList.add()` e `classList.remove()`

---

## Aggiornamento 04/11/2026 — Refactoring con Flexbox

Durante la lezione EPICODE ho migliorato il layout responsive del portfolio utilizzando Flexbox.

### Modifiche effettuate

- **Navigazione:** utilizzo di `display: flex`, `flex-wrap`, `gap` e `justify-content` per distribuire uniformemente i pulsanti.
- **Chi Sono:** sostituzione di `float` con Flexbox per affiancare avatar e testo da 768px.
- **Competenze:** creazione di chips arrotondate, con dimensioni uniformi e disposizione responsive.
- **Progetti:** realizzazione di una griglia responsive con `flex-wrap` e `flex: 1 1 300px`.
- **Footer:** riorganizzazione delle icone social e del copyright con Flexbox.
- **Form Contattami:** utilizzo di `localStorage`, `JSON.stringify()` e `JSON.parse()` per visualizzare i dati nella pagina `success.html`.

### Concetti approfonditi

- `display: flex`
- `flex-direction`
- `justify-content` e `align-items`
- `flex-wrap` e `gap`
- `flex-grow`, `flex-shrink` e `flex-basis`
- `order`
- `localStorage` e manipolazione del DOM

---

## Refactoring iniziale — Responsive Design

### Obiettivo

Adattamento del portfolio personale con approccio **mobile-first**, mantenendo la grafica originale.

### Modifiche effettuate

- Media query a **768px e 1200px**.
- Header, navigazione, immagini e sezioni responsive.
- Avatar centrato su mobile e affiancato al testo su desktop.
- Tabelle con scorrimento orizzontale tramite `overflow-x: auto`.
- Form e pulsante adattati alle diverse larghezze.
- Tipografia responsive con `clamp()`.

### Verifica accessibilità — WCAG

Ho verificato il contrasto tra il testo bianco della navigazione e lo sfondo dell'header utilizzando **Chrome DevTools**, campionando una delle zone più chiare dell'immagine.

- **Contrasto rilevato:** 8.09:1
- **WCAG AA (4.5:1):** Superato
- **WCAG AAA (7:1):** Superato

Il risultato riguarda il punto campionato. Un gradiente scuro contribuisce a mantenere leggibile la navigazione.

### Screenshot della verifica

![Verifica contrasto WCAG](assets/IMG/contrasto-wcag.png)

---

## Tecnologie utilizzate

- HTML5
- CSS3
- JavaScript
- Flexbox
- Media Queries
- CSS Animations e Transitions
- LocalStorage
- Chrome DevTools
- Git e GitHub
- Visual Studio Code

## Note tecniche

Il portfolio è composto da tre pagine principali:

- `index.html` — Homepage con presentazione, competenze, esperienze, progetti e form di contatto.
- `progetti.html` — Descrizione dettagliata dei progetti realizzati.
- `success.html` — Pagina di ringraziamento con riepilogo dei dati del form.

**Nota:** il modulo di contatto è dimostrativo. I dati vengono salvati nel browser tramite `localStorage` e non inviati a un server.

---

**EPICODE — Full Stack AI Developer 2026**