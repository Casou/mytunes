export default class PlaylistManager {

    constructor() {
        this.musiquePlaying = null;
        this.musiques = [];
    }

    addMusique(musique) {
        this.musiques.push(musique);
    }

    setMusiquePlaying(musiquePlaying) {
        this.musiquePlaying = musiquePlaying;

        const musiques = [...this.musiques ];
        let found = false;
        for (let musique of musiques) {
            if (musiquePlaying.itunesId === musique.itunesId) {
                found = true;
                musique.alreadyPlayed = false;
            } else {
                musique.alreadyPlayed = !found;
            }
        }
    }

    getNextSong() {
        if (this.musiquePlaying === null) {
            return null;
        }

        let musique;
        for (let i = 0; i < this.musiques.length; i++) {
            musique = this.musiques[i];
            if (this.musiquePlaying.itunesId === musique.itunesId) {
                i++;
                return i < this.musiques.length ? this.musiques[i] : null;
            }
        }
        return null;
    }

    getPrevSong() {
        if (this.musiquePlaying === null) {
            return null;
        }

        let musique;
        for (let i = 0; i < this.musiques.length; i++) {
            musique = this.musiques[i];
            if (this.musiquePlaying.itunesId === musique.itunesId) {
                i--;
                return i >= 0 ? this.musiques[i] : null;
            }
        }
        return null;
    }

}