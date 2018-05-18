import React from 'react';
import PropTypes from 'prop-types';
import SortableTree from 'react-sortable-tree';
import {connect} from "react-redux";
import {assign} from "lodash";

import {playlistPropType} from "../../../common/types/PlaylistType";

import 'react-sortable-tree/style.css';
import '../../../../style/components/savedPlaylists.css';
import TreeNodeRenderer from "../renderers/TreeNodeRenderer";
import SavedPlaylistSortableList from "../components/SavedPlaylistSortableList";

class SavedPlaylists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: this._mapPlaylistToTreeItem(props.playlists),
            musiques: [{ id: 1, titre : "Test", bpm : 40, classement : 5, duree : 180, genreIds : [], path : '/' },
                { id: 2, titre : "Test 2", bpm : 60, classement : 5, duree : 235, genreIds : [], path : '/' },
                { id: 3, titre : "Test 3", bpm : 50, classement : 5, duree : 135, genreIds : [], path : '/' },
                { id: 4, titre : "Test 4", bpm : 45, classement : 5, duree : 245, genreIds : [], path : '/' }
            ]
        };

        this._clickItem = this._clickItem.bind(this);
    }

    render() {
        return (
        <div id={"savedPlaylists"}>
            <SortableTree
                treeData={this.state.treeData}
                onChange={treeData => this.setState({ treeData })}
                rowHeight={55}
                nodeContentRenderer={(props) => <TreeNodeRenderer onClick={this._clickItem} {...props} /> }
                onClick={ (node) => console.log(node)}
            />
            <div id={"musiquesPlaylist"}>
                <SavedPlaylistSortableList musiques={this.state.musiques}
                                           helperClass="playlistSortableHelper"
                />
            </div>
        </div>);
    }

    _mapPlaylistToTreeItem(playlists) {
        return playlists.map(playlist => {
            return {
                id : playlist.id,
                title : playlist.nom,
                subtitle : this._getSubtitle(playlist),
                expanded : true,
                children : playlist.children ? this._mapPlaylistToTreeItem(playlist.children) : null
            }
        });
    }

    _getSubtitle(playlist) {
        return playlist.isFolder ?
            this._getPlaylistSubtitle(playlist) :
            this._getMusiqueSubtitle(playlist);
    }

    _getPlaylistSubtitle(playlist) {
        return playlist.children ?
            playlist.children.length > 1 ? playlist.children.length + " playlists" : playlist.children.length + " playlist"
            : "0 playlist"
            + !playlist.isFolder || playlist.musiques.length > 0 ? " / " + this._getMusiqueSubtitle() : "";
    }

    _getMusiqueSubtitle(playlist) {
        return playlist.musiques ?
            playlist.musiques.length > 1 ? playlist.musiques.length + " chansons" : playlist.musiques.length + " chanson"
            : "0 chanson";
    }

    _clickItem(node) {
        console.log(node);
    }
}

SavedPlaylists.propTypes = {
    playlists: PropTypes.arrayOf(playlistPropType).isRequired
};
SavedPlaylists.defaultProps = {
    playlists : []
};

export default connect(state => assign({}, {
    playlists: state.playlists
}), null)(SavedPlaylists);
