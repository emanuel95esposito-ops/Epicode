// === Classi dei libri ===

export class Libro {
    #id;
    letto = false;

    constructor(_titolo, _autore, _anno) {
        this.#id = crypto.randomUUID();
        this.titolo = _titolo;
        this.autore = _autore;
        this.anno = _anno;
    }

    getId() {
        return this.#id;
    }

    segnaComeLetto() {
        this.letto = true;
    }

    formato() {
        return "cartaceo";
    }

    toJSON() {
        return {
            ...this,
            id: this.#id
        };
    }

    static fromJSON(dati) {
        const libro = new this(
            dati.titolo,
            dati.autore,
            dati.anno,
            dati.dimensioneMb ?? dati.durataMinuti
        );

        if (dati.id) {
            libro.#id = dati.id;
        }

        libro.letto = dati.letto === true;

        return libro;
    }

    static daStringa(s) {
        const [titolo, autore, anno] = s.split("|");

        return new Libro(titolo, autore, Number(anno));
    }
}

export class LibroDigitale extends Libro {
    constructor(_titolo, _autore, _anno, _dimensioneMb) {
        super(_titolo, _autore, _anno);
        this.dimensioneMb = _dimensioneMb;
    }

    formato() {
        return `digitale (${this.dimensioneMb} MB)`;
    }
}


export class LibroAudio extends Libro {
    constructor(_titolo, _autore, _anno, _durataMinuti) {
        super(_titolo, _autore, _anno);
        this.durataMinuti = _durataMinuti;
    }

    formato() {
        return `audio (${this.durataMinuti} min)`;
    }
}
