export default class PlaylistProvider {

    constructor(playlists) {
        this.playlists = playlists;
        this.key = Math.round(Math.random() * 100000);
    }

    findById(id) {
        return this._searchById(this.playlists, id);
    }

    _searchById(playlists, id) {
        let result = null;
        for (let i = 0; result === null && i < playlists.length; i++) {
            const playlist = playlists[i];
            if (playlist.id === id) {
                result = playlist;
            } else if (playlist.children) {
                result = this._searchById(playlist.children, id);
            }
        }

        return result;
    }
}
