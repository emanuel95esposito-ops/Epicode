const buttonScrivimi = document.querySelector('#apri-contatti');
const overlay = document.querySelector('#overlay-contatti');
const buttonChiudi = document.querySelector('#chiudi-contatti');

buttonScrivimi.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'block';
});

buttonChiudi.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'none';
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        overlay.style.display = 'none';
    }
});