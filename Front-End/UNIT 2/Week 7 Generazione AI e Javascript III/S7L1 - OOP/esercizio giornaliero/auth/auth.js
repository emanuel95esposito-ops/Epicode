// === Autenticazione (DummyJSON) ===

import { creaElemento, authBox, profiloSection, profiloContenuto } from "../assets/import/render.js";
import { getJSON } from "../assets/import/functions.js";

// === Token in localStorage ===

const TOKEN_KEY = "libreria:token";

let utente = null;

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

// === Chiamate al server ===

export async function login(username, password) {
    const dati = await getJSON("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    localStorage.setItem(TOKEN_KEY, dati.accessToken ?? dati.token);

    return dati;
}

export async function caricaProfilo() {
    const token = getToken();

    if (!token) return null;

    try {
        return await getJSON("https://dummyjson.com/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (err) {
        if (err.status === 401) {
            logout();
            return null;
        }

        throw err;
    }
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);

    utente = null;

    profiloSection.hidden = true;
    profiloContenuto.replaceChildren();

    renderAuthBox();
}

// === Interfaccia ===

export function renderAuthBox() {
    authBox.replaceChildren();

    if (utente) {
        const riga = creaElemento("div", "d-flex align-items-center gap-3", authBox);

        creaElemento("span", "fw-semibold", riga, `Ciao, ${utente.firstName}`);

        const esci = creaElemento("button", "btn btn-outline-secondary btn-sm", riga, "Esci");

        esci.type = "button";
        esci.addEventListener("click", logout);

        return;
    }

    const form = creaElemento("form", "row g-2 align-items-end", authBox);

    const colUtente = creaElemento("div", "col-sm-4", form);
    const labelUtente = creaElemento("label", "form-label", colUtente, "Username");
    const inputUtente = creaElemento("input", "form-control", colUtente, undefined, "login-username");

    labelUtente.htmlFor = "login-username";
    inputUtente.type = "text";
    inputUtente.name = "username";
    inputUtente.required = true;
    inputUtente.autocomplete = "username";

    const colPassword = creaElemento("div", "col-sm-4", form);
    const labelPassword = creaElemento("label", "form-label", colPassword, "Password");
    const inputPassword = creaElemento("input", "form-control", colPassword, undefined, "login-password");

    labelPassword.htmlFor = "login-password";
    inputPassword.type = "password";
    inputPassword.name = "password";
    inputPassword.required = true;
    inputPassword.autocomplete = "current-password";

    const colBottone = creaElemento("div", "col-sm-4", form);
    const entra = creaElemento("button", "btn btn-primary", colBottone, "Entra");

    entra.type = "submit";

    const erroreLogin = creaElemento("div", "text-danger small mt-2", form, "", "errore-login");

    erroreLogin.hidden = true;

    form.addEventListener("submit", gestisciLogin);
}

async function gestisciLogin(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const bottone = form.querySelector("button[type='submit']");
    const erroreLogin = form.querySelector("#errore-login");

    erroreLogin.hidden = true;
    bottone.disabled = true;
    bottone.textContent = "Accesso...";

    try {
        utente = await login(
            form.elements.username.value.trim(),
            form.elements.password.value
        );

        renderAuthBox();
        await mostraProfilo();
    } catch (err) {
        erroreLogin.textContent = err.status === 400 || err.status === 401
            ? "Username o password non validi."
            : `Errore durante l'accesso: ${err.message}`;

        erroreLogin.hidden = false;
        bottone.disabled = false;
        bottone.textContent = "Entra";
    }
}

export async function mostraProfilo() {
    try {
        const profilo = await caricaProfilo();

        if (!profilo) return;

        utente = profilo;

        profiloContenuto.replaceChildren();

        const riga = creaElemento("div", "d-flex align-items-center gap-3", profiloContenuto);

        const avatar = creaElemento("img", "rounded-circle border bg-light", riga);

        avatar.src = profilo.image;
        avatar.alt = `Immagine del profilo di ${profilo.firstName}`;
        avatar.width = 64;
        avatar.height = 64;

        const testi = creaElemento("div", "", riga);

        creaElemento("p", "fw-semibold mb-1", testi, `${profilo.firstName} ${profilo.lastName}`);
        creaElemento("p", "text-muted small mb-0", testi, profilo.email);

        profiloSection.hidden = false;
    } catch (err) {
        profiloContenuto.replaceChildren();

        creaElemento("p", "text-danger mb-0", profiloContenuto,
            `Impossibile caricare il profilo: ${err.message}`);

        profiloSection.hidden = false;
    }
}
