export default class PlaylistProvider {

    constructor(playlists) {
        this._playlists = playlists;
        this.key = Math.round(Math.random() * 100000);
    }

    findById(id) {
        return this._searchById(this._playlists, id);
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

    getPlaylists() {
        return [...this._playlists];
    }

    getHierarchicalPlaylists() {
        return this.mapHierarchicalPlaylists([... this._playlists]);
    }

    mapHierarchicalPlaylists(playlists) {
        playlists.forEach(playlist => {
            if (playlist.childrenIds) {
                playlist.children = [];
                playlist.childrenIds.forEach(childId => {
                    const child = this._playlists.filter(pl => pl.id === childId)[0];
                    playlist.children.push(child);
                    child.parent = playlist;
                })
            }
        });

        return playlists.filter(playlist => !playlist.parent);
    }

    updatePlaylist(id, mapPropertyValue) {
        const playlist = this._playlists.filter(playlist => playlist.id === id)[0];
        mapPropertyValue.forEach(prop => playlist[prop.property] = prop.value);

        console.log(this._playlists);
    }
}
