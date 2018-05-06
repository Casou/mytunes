export default class PlaylistManager {

    constructor() {
        this.musiquePlaying = null;
        this.musiques = [];
        this.shuffle = false;
    }

    addMusique(musique) {
        this.musiques.push(musique);
    }

    setMusiquePlaying(musiquePlaying) {
        this.musiquePlaying = musiquePlaying;

        const musiques = [ ...this.musiques ];
        // let found = false;
        // for (let musique of musiques) {
        //     if (musiquePlaying.itunesId === musique.itunesId) {
        //         found = true;
        //         musique.alreadyPlayed = false;
        //     } else {
        //         musique.alreadyPlayed = !found;
        //     }
        // }
        musiques.filter(musique => musiquePlaying.itunesId === musique.itunesId)
            .forEach(musique => musique.alreadyPlayed = true);
    }

    getNextSong() {
        if (this.shuffle) {
            let remainingSongs = this.musiques.filter(musique => !musique.alreadyPlayed);
            if (remainingSongs.length === 0) {
                const musiquesPurged = [...this.musiques];
                musiquesPurged.forEach(musique => musique.alreadyPlayed = false);
                this.musiques = musiquesPurged;
                remainingSongs = musiquesPurged;
            }
            const randomIndex = parseInt(Math.random() * (remainingSongs.length - 1), 10);
            return remainingSongs[randomIndex];
        }

        if (this.musiquePlaying === null) {
            return this.musiques.length > 0 ? this.musiques[0] : null;
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

    toggleShuffle() {
        this.shuffle = !this.shuffle;
    }

}