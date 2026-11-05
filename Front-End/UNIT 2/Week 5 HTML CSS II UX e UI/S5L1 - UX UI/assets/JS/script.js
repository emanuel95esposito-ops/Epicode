const buttonScrivimi = document.querySelector('#apri-contatti');
const overlay = document.querySelector('#overlay-contatti');
const buttonChiudi = document.querySelector('#chiudi-contatti');
const myForm = document.querySelector('#form-contatti');
const registeredUser = {
    nome: '',
    email: '',
    motivo: '',
    data: '',
    messaggio: '',
    consenso: false,
}

buttonScrivimi.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'block';
    document.body.classList.add('modal-aperto');
});

buttonChiudi.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'none';
    document.body.classList.remove('modal-aperto');
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
        document.body.classList.remove('modal-aperto');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        overlay.style.display = 'none';
        document.body.classList.remove('modal-aperto');
    }
});

myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    registeredUser.nome = document.querySelector('#nome').value;
    registeredUser.email = document.querySelector('#email').value;
    registeredUser.motivo = document.querySelector('#motivo').value;
    registeredUser.data = document.querySelector('#data').value;
    registeredUser.messaggio = document.querySelector('#messaggio').value;
    registeredUser.consenso = document.querySelector('#consenso').checked;

    console.log(registeredUser);
    localStorage.removeItem('registeredUser');
    localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
    location.href = 'success.html';
});

