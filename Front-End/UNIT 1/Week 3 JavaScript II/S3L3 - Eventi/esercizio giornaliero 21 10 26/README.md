# Task Manager – EPICODE

## Obiettivo
Completare la ToDoList con JavaScript, mantenendo la struttura HTML e il CSS forniti e integrando le funzionalità del precedente esercizio.

## Ragionamento seguito
1. Ho analizzato HTML e CSS per individuare gli elementi da selezionare e le classi da utilizzare.
2. Ho organizzato le attività in un array di oggetti `tasks`, con ID, testo, stato di completamento, priorità e data.
3. Ho creato `renderLista()` per generare i task nel DOM e aggiornare il contatore in base ai dati.
4. Ho utilizzato `addEventListener()` per gestire l'invio del form, le checkbox, l'eliminazione tramite *event delegation* e i filtri.
5. Ho recuperato badge, colori ed evidenziazione dall'esercizio precedente. Come EXTRA, ho previsto `localStorage` per conservare le modifiche dopo il refresh.

**Scelta principale:** separare i dati (`tasks`) dalla loro visualizzazione (`renderLista()`), così ogni modifica può aggiornare correttamente la pagina.
