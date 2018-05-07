export default class PlaylistManager {

    constructor() {
        this.musiquePlaying = null;
        this.musiques = [];
        this.shuffle = false;
        this.history = [];
    }

    addMusique(musique) {
        this.musiques.push(musique);
    }

    setMusiquePlaying(musiquePlaying, addMusique) {
        if (addMusique && this.musiquePlaying) {
            this.history.push(this.musiquePlaying);
        } else {
            this.history.pop();
        }

        this.musiquePlaying = musiquePlaying;

        this.musiques.filter(musique => musiquePlaying.itunesId === musique.itunesId)
            .forEach(musique => musique.alreadyPlayed = true);

        console.log(this.history);
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

            let nextSong = remainingSongs[randomIndex];
            return nextSong;
        }

        if (this.musiquePlaying === null) {
            return this.musiques.length > 0 ? this.musiques[0] : null;
        }

        let nextSong = null;
        let musique;
        for (let i = 0; i < this.musiques.length; i++) {
            musique = this.musiques[i];
            if (this.musiquePlaying.itunesId === musique.itunesId) {
                i++;
                if (i < this.musiques.length) {
                    nextSong = this.musiques[i];
                }
                return nextSong;
            }
        }
        return null;
    }

    getPrevSong() {
        if (this.history.length === 0) {
            return null;
        }

        this.musiques.filter(musique => this.musiquePlaying.itunesId === musique.itunesId)
            .forEach(musique => musique.alreadyPlayed = false);

        let prevSong = this.history[this.history.length - 1];
        if (prevSong.itunesId === this.musiquePlaying.itunesId) {
            prevSong = this.history[this.history.length - 2];
        }

        return prevSong;
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
    }

    clearPlaylist() {
        this.musiques = [];
        this.history = [];
    }

}