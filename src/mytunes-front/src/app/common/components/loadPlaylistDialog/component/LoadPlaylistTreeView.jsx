import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from "@material-ui/core";
import {TextField} from "material-ui";
import {__KEYCODE_ENTER__} from "../../../../../App";
import PlaylistTreeView from "./PlaylistTreeView";

class LoadPlaylistTreeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cursor : null,
            filterValue : ""
        };

        this._onToggle = this._onToggle.bind(this);
    }

    _onToggle = (node) => {
        this.setState({ cursor: node });
        this.props.onChoosePlaylist(node.id);
    };

    _mapPlaylists(playlists) {
        return playlists.map(playlist => {
            const mappedPlaylist = {
                id: playlist.id,
                name: playlist.nom,
                nbMusiques : playlist.musiqueIds.length,
                active : this.state.cursor ? playlist.id === this.state.cursor.id : false,
                selectable : true
            };
            if (playlist.children.length) {
                mappedPlaylist.toggled = true;
                mappedPlaylist.children = this._mapPlaylists(playlist.children);
            }
            return mappedPlaylist;
        });
    }

    _filterPlaylists() {
        const { filterValue } = this.state;

        if (!filterValue) {
            return this.props.playlistProvider.getHierarchicalPlaylists();
        }

        let allPlaylists = this.props.playlistProvider.getPlaylists();
        if (!allPlaylists) {
            return [];
        }

        const filteredIds = allPlaylists.filter(playlist => playlist.nom.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0)
            .map(playlist => playlist.id);

        for (let id of filteredIds) {
            const playlist = allPlaylists.filter(playlist => playlist.id === id)[0];
            let parent = playlist.parent;
            while (parent) {
                if (!filteredIds.includes(parent.id)) {
                    filteredIds.push(parent.id);
                }
                parent = parent.parent;
            }
        }

        return this.props.playlistProvider.mapHierarchicalPlaylists(allPlaylists, filteredIds);
    }

    render() {
        const filteredPlaylists = this._mapPlaylists(this._filterPlaylists());

        return (
            <div>
                { this.props.onFilter ?
                    <div className={"searchPlaylist"}>
                        <Icon className="material-icons">search</Icon>
                        <TextField className="textField" name={"searchPlaylist"} placeholder={"Recherche"}
                                   onKeyPress={e => {
                                       if (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__) {
                                           if (this.props.onFilter) {
                                                this.props.onFilter();
                                           }
                                           this.setState({
                                               ...this.state,
                                               filterValue: e.target.value
                                           });
                                       }
                                   }}
                        />
                    </div>
                    :
                    ""
                }
                <PlaylistTreeView data={filteredPlaylists}
                                  onToggle={ this._onToggle }
                />
            </div>);
    }
}

LoadPlaylistTreeView.propTypes = {
    playlistProvider : PropTypes.object.isRequired,
    onChoosePlaylist : PropTypes.func.isRequired,
    onFilter : PropTypes.func
};

export default LoadPlaylistTreeView;