import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton, Dialog } from 'material-ui';
import TextFieldInput from "../../form/TextFieldInput";
import PlaylistTreeView from "../../loadPlaylistDialog/component/PlaylistTreeView";

class SavePlaylistDIalog extends React.Component {
    state = {
        open: false,
        playlistName : "",
        playlistParentId : null
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    _mapPlaylists(playlists) {
        return playlists.map(playlist => {
            const mappedPlaylist = {
                id: playlist.id,
                name: playlist.nom,
                nbMusiques : playlist.musiqueIds.length,
                active : this.state.cursor ? playlist.id === this.state.cursor.id : false,
                selectable : false
            };
            if (playlist.children.length) {
                mappedPlaylist.selectable = true;
                mappedPlaylist.toggled = true;
                mappedPlaylist.children = this._mapPlaylists(playlist.children);
            }
            return mappedPlaylist;
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Annuler"
                primary={false}
                onClick={ () => {
                    if (this.props.onCancel) {
                        this.props.onCancel();
                    }
                    this.handleClose();
                }}
            />,
            <FlatButton
                label="Sauvegarder"
                primary={true}
                disabled={!this.state.playlistName || !this.state.playlistParentId}
                onClick={ () => {
                    if (this.props.onConfirm) {
                        this.props.onConfirm();
                    }
                    this.handleClose();
                }}
            />,
        ];

        const playlists = this._mapPlaylists(this.props.playlistProvider.getHierarchicalPlaylists());

        return (
            <Dialog
                title={ this.props.title }
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                className={"savePlaylistDialog"}
            >
                <PlaylistTreeView data={ playlists }
                                  toggleOnClick={ false }
                />
                <TextFieldInput onChange={(value) => this.setState({...this.state, playlistName : value })}
                                changeOnEnter={false}
                                name={"savePlaylistName"}
                                placeholder={"Nom de la playlist"} />
            </Dialog>
        );
    }
}

SavePlaylistDIalog.propTypes = {
    title : PropTypes.string,
    onConfirm : PropTypes.func,
    onCancel : PropTypes.func,
    playlistProvider : PropTypes.object.isRequired
};
SavePlaylistDIalog.defaultProps = {
    title : "Sauvegarde de la playlist"
};

export default SavePlaylistDIalog;