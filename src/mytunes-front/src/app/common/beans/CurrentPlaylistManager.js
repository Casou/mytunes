import {arrayMove} from 'react-sortable-hoc';

export default class CurrentPlaylistManager {

    constructor(originalPlaylistManager) {
        this.musiquePlaying = originalPlaylistManager && originalPlaylistManager.musiquePlaying;
        this.playlist = originalPlaylistManager && originalPlaylistManager.playlist;
        this.musiques = originalPlaylistManager && originalPlaylistManager.musiques ?
            originalPlaylistManager && originalPlaylistManager.musiques :
            [];
        this.shuffle = originalPlaylistManager && originalPlaylistManager.shuffle ?
            originalPlaylistManager && originalPlaylistManager.shuffle :
            false;
        this.history = originalPlaylistManager && originalPlaylistManager.history ?
            originalPlaylistManager && originalPlaylistManager.history :
            [];
    }

    addMusique(musique) {
        this.musiques.push(musique);
        if (this.playlist) {
            this.playlist.musiqueIds.push(musique.id);
        }
    }

    setMusiquePlaying(musiquePlaying, addMusique) {
        if (this.musiquePlaying) {
            if (addMusique) {
                this.history.push(this.musiquePlaying);
            } else {
                this.history.pop();
            }
        }

        this.musiquePlaying = musiquePlaying;

        if (this.musiquePlaying) {
            this.musiques.filter(musique => musiquePlaying.id === musique.id)
                .forEach(musique => musique.alreadyPlayed = true);
        }
    }

    setMusiqueError(musiqueError) {
        this.musiques.filter(musique => musiqueError.id === musique.id)
            .forEach(musique => musique.error = true);
    }

    reorderMusique = (oldIndex, newIndex) => {
        this.musiques = arrayMove(this.musiques, oldIndex, newIndex);
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
        if (this.playlist) {
            this.playlist.musiqueIds = [];
        }
    }

    newPlaylist() {
        this.playlist = null;
        this.musiques = [];
    }

    loadPlaylist(playlist, musiques) {
        this.playlist = {...playlist};
        this.musiques = musiques;
        this.musiques.forEach(musique => {
            musique.alreadyPlayed = false;
            musique.error = false;
        });
    }

    updatePlaylistName(name) {
        this.playlist.nom = name;
    }

    setPlaylist(playlist) {
        this.playlist = playlist;
    }
}