import React from 'react';
import PropTypes from 'prop-types';
import SortableTree from 'react-sortable-tree';
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";
import {arrayMove} from 'react-sortable-hoc';
import { FontIcon, TextField } from 'material-ui';

import 'react-sortable-tree/style.css';
import '../../../../style/components/savedPlaylists.css';
import TreeNodeRenderer from "../renderers/TreeNodeRenderer";
import SavedPlaylistSortableList from "../components/SavedPlaylistSortableList";
import {musiquePropType} from "../../../common/types/MusiqueType";
import PlaylistsActions from "../actions/PlaylistsActions";
import {__KEYCODE_ENTER__} from "../../../../App";
import ConfirmDialog from "../../../common/components/confirm/ConfirmDialog";

class SavedPlaylists extends React.Component {
    constructor(props) {
        super(props);

        const { playlistId } = this.props.match.params;
        const selectedPlaylist = playlistId ? props.playlistProvider.findById(parseInt(playlistId, 10)) : null;

        this.state = {
            treeData: this._mapPlaylistToTreeItem(props.playlistProvider.getHierarchicalPlaylists()),
            selectedPlaylist,
            musiques: selectedPlaylist ? this._getMusiques(selectedPlaylist) : []
        };

        this.inputPlaylistNom = null;
        this.playlistToDelete = null;

        this._selectPlaylist = this._selectPlaylist.bind(this);
        this._onDeleteMusique = this._onDeleteMusique.bind(this);
        this._updatePlaylistName = this._updatePlaylistName.bind(this);
        this._sortEnd = this._sortEnd.bind(this);
        this._showDeletePlaylistConfirm = this._showDeletePlaylistConfirm.bind(this);
        this._confirmDelete = this._confirmDelete.bind(this);
        this._sortedTree = this._sortedTree.bind(this);
    }

    render() {
        const { selectedPlaylist, treeData, musiques } = this.state;
        const { playlistProvider } = this.props;

        return (
            <div id={"savedPlaylists"}>
                    <SortableTree
                            key={selectedPlaylist ? "savedPlaylistsTree_" + selectedPlaylist.id + "_" + playlistProvider.key : "savedPlaylistsTree_key"}
                            treeData={treeData}
                            rowHeight={55}
                            maxDepth={4}
                            nodeContentRenderer={(props) => <TreeNodeRenderer onClick={this._selectPlaylist}
                                                                              selectedPlaylist={selectedPlaylist}
                                                                              {...props} /> }
                            generateNodeProps={rowInfo => ({
                                buttons: [
                                    <button
                                        style={{
                                            verticalAlign: 'middle',
                                        }}
                                        onClick={(e) => this._showDeletePlaylistConfirm(rowInfo, e)}
                                    >
                                        <FontIcon className="material-icons">delete</FontIcon>
                                    </button>,
                                ],
                            })}
                            onChange={ this._sortedTree }
                />
                <ConfirmDialog ref={ref => this.confirmDeletePlaylist = ref}
                               message={"Etes-vous sûr de vouloir supprimer cette playlist ?"}
                               onConfirm={ this._confirmDelete }
                />
                {
                    !selectedPlaylist ?
                        <div id={"musiquesPlaylist"}>
                            <h1>Aucune playlist sélectionnée</h1>
                        </div>
                        :
                        <div id={"musiquesPlaylist"}>
                            <header>
                                <TextField className="textField" name={"playlistName"} placeholder={"Nom de la playlist"}
                                           ref={instance => this.inputPlaylistNom = instance }
                                           value={selectedPlaylist.nom}
                                           onChange={event => {
                                               this.setState({
                                                   ...this.state,
                                                   selectedPlaylist : {...selectedPlaylist, nom : event.target.value}
                                               });
                                           }}
                                           onKeyPress={e => {
                                               if (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__) {
                                                   this.inputPlaylistNom.blur();
                                               }
                                           }}
                                           onBlur={event => this._updatePlaylistName(selectedPlaylist.id, event.target.value)}
                                />
                            </header>
                            <SavedPlaylistSortableList musiques={musiques}
                                                       helperClass="playlistSortableHelper"
                                                       onDeleteMusique={this._onDeleteMusique}
                                                       pressDelay={200}
                                                       onSortEnd={ this._sortEnd }
                            />
                        </div>
                }

        </div>);
    }

    _sortEnd({oldIndex, newIndex}) {
        const { selectedPlaylist, musiques } = this.state;
        const musiqueSorted = arrayMove([...musiques], oldIndex, newIndex);
        this.props.playlistsActions.updateMusiqueOrder(selectedPlaylist.id, musiqueSorted)
            .then(() => {
                this.setState({
                    ...this.state,
                    musiques: musiqueSorted
                });
            });
    }

    _mapPlaylistToTreeItem(playlists) {
        return !(playlists && playlists.length) ? [] : playlists.map(playlist => {
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
            + !playlist.isFolder || playlist.musiqueIds.length > 0 ? " / " + this._getMusiqueSubtitle() : "";
    }

    _getMusiqueSubtitle(playlist) {
        return playlist.musiqueIds ?
            playlist.musiqueIds.length > 1 ? playlist.musiqueIds.length + " chansons" : playlist.musiqueIds.length + " chanson"
            : "0 chanson";
    }

    _selectPlaylist(node) {
        const playlist = this.props.playlistProvider.findById(node.id);

        this.setState({
            ...this.state,
            selectedPlaylist: playlist,
            musiques: this._getMusiques(playlist)
        });
    }

    _getMusiques(playlist) {
        const musiques = [];

        if (playlist.musiqueIds) {
            for (let id of playlist.musiqueIds) {
                musiques.push(this.props.musiques.filter(musique => musique.id === id)[0]);
            }
        }

        return musiques;
    }

    _updatePlaylistName(id, name) {
        this.props.playlistsActions.updatePlaylistNom(id, name);

        this._updatePlaylists(id, [{ property : "nom", value : name }]);
    }

    _updatePlaylists(id, properties) {
        this.props.playlistProvider.updatePlaylist(id, properties);
        this.setState({
            ...this.state,
            treeData: this._mapPlaylistToTreeItem(this.props.playlistProvider.getHierarchicalPlaylists())
        });
    }

    _onDeleteMusique(musique) {
        const { selectedPlaylist } = this.state;

        this.props.playlistsActions.deletePlaylistMusique(selectedPlaylist.id, musique.id).then(() => {
            const { musiques } = this.state;

            let musiquesFiltered = musiques.filter(m => m.id !== musique.id);
            this.setState({
                ...this.state,
                musiques: musiquesFiltered
            }, () => this._updatePlaylists(selectedPlaylist.id, [{ property : "musiqueIds", value : musiquesFiltered.map(m => m.id) }]));
        });
    }

    _showDeletePlaylistConfirm(rowInfo, e) {
        e.preventDefault();
        e.stopPropagation();
        this.playlistToDelete = rowInfo.node.id;
        this.confirmDeletePlaylist.handleOpen();
    }

    _confirmDelete() {
        console.log(this.playlistToDelete);
    }

    _sortedTree(treeData) {
        this.setState({ treeData });
        this.props.playlistsActions.sortPlaylistTree(this._mapSortedTreeData(treeData));
    }

    _mapSortedTreeData(treeData) {
        return {
            id : null,
            parentId : null,
            children: this._mapSortedTreeDataRecursive(treeData, null)
        }
    }

    _mapSortedTreeDataRecursive(treeData, parentId) {
        const playlistList = [];
        for (let data of treeData) {
            const children = data.children ? this._mapSortedTreeDataRecursive(data.children, data.id) : [];
            playlistList.push({ id : data.id, parentId, children })
        }
        return playlistList;
    }
}

SavedPlaylists.propTypes = {
    playlistProvider: PropTypes.object.isRequired,
    musiques: PropTypes.arrayOf(musiquePropType).isRequired
};
SavedPlaylists.defaultProps = {
    playlistProvider : [],
    musiques : []
};

export default connect(state => assign({}, {
    playlistProvider: state.playlistProvider,
    musiques: state.musiques
}), dispatch => ({
    playlistsActions: bindActionCreators(PlaylistsActions, dispatch)
}))(SavedPlaylists);
