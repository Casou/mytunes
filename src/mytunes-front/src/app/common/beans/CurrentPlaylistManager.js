import {arrayMove} from 'react-sortable-hoc';

export default class CurrentPlaylistManager {

    constructor() {
        this.musiquePlaying = null;
        this.playlist = null;
        this.musiques = [];
        this.shuffle = false;
        this.history = [];
        this.hasChanges = false;
    }

    addMusique(musique) {
        this.musiques.push(musique);
        this.playlist.musiqueIds.push(musique.id);
        this.hasChanges = true;
    }

    setMusiquePlaying(musiquePlaying, addMusique) {
        if (addMusique && this.musiquePlaying) {
            this.history.push(this.musiquePlaying);
        } else {
            this.history.pop();
        }

        this.musiquePlaying = musiquePlaying;

        this.musiques.filter(musique => musiquePlaying.id === musique.id)
            .forEach(musique => musique.alreadyPlayed = true);
    }

    reorderMusique = (oldIndex, newIndex) => {
        this.musiques = arrayMove(this.musiques, oldIndex, newIndex);
        this.hasChanges = true;
        return this;
    };

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
            if (this.musiquePlaying.id === musique.id) {
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

        this.musiques.filter(musique => this.musiquePlaying.id === musique.id)
            .forEach(musique => musique.alreadyPlayed = false);

        let prevSong = this.history[this.history.length - 1];
        if (prevSong.id === this.musiquePlaying.id) {
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
        this.playlist.musiqueIds = [];
        this.hasChanges = true;
    }

    loadPlaylist(playlist, musiques) {
        this.playlist = playlist;
        this.musiques = musiques;
        this.musiques.forEach(musique => musique.alreadyPlayed = false);
        this.hasChanges = false;
    }

    updatePlaylistName(name) {
        this.playlist.nom = name;
        this.hasChanges = true;
    }

}