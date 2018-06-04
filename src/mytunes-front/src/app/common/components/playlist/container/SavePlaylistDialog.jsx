import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, FlatButton} from 'material-ui';
import TextFieldInput from "../../form/TextFieldInput";
import PlaylistTreeView from "../../loadPlaylistDialog/component/PlaylistTreeView";
import {playlistPropType} from "../../../types/PlaylistType";

class SavePlaylistDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            playlistName : "",
            playlistParentId : null
        };

        this.mappedPlaylists = [];
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.hierarchicalPlaylists !== nextProps.hierarchicalPlaylists) {
            const rootPlaylist = [{
                id : -1,
                nom : "Racine",
                isFolder : true,
                children : [...this.props.hierarchicalPlaylists],
                musiqueIds : []
            }];

            this.mappedPlaylists = this._mapPlaylists(rootPlaylist);
        }

        if (this.props.playlist !== nextProps.playlist) {
            this.setState({...this.state,
                playlistName : nextProps.playlist.nom,
                playlistParentId : nextProps.playlist.parent && nextProps.playlist.parentId });
        }

    }

    render() {
        const { onCancel, onConfirm, title } = this.props;
        const { playlistName, playlistParentId, open } = this.state;

        const actions = [
            <FlatButton
                label="Annuler"
                primary={false}
                onClick={ () => {
                    if (onCancel) {
                        onCancel();
                    }
                    this.handleClose();
                }}
            />,
            <FlatButton
                label="Sauvegarder"
                primary={true}
                disabled={!playlistName || !playlistParentId}
                onClick={ () => {
                    if (onConfirm) {
                        onConfirm({ playlistName, playlistParentId })
                            .then(() => this.handleClose());
                    } else {
                        this.handleClose();
                    }
                }}
            />,
        ];

        return (
            <Dialog
                title={ title }
                actions={actions}
                modal={false}
                open={open}
                onRequestClose={this.handleClose}
                className={"savePlaylistDialog"}
            >
                <PlaylistTreeView data={ this.mappedPlaylists }
                                  toggleOnClick={ false }
                                  onToggle={ (node) => this.setState({...this.state, playlistParentId : node.id}) }
                                  playlistSelected={ playlistParentId }
                />
                <TextFieldInput name={"savePlaylistName"}
                                placeholder={"Nom de la playlist"}
                                value={ playlistName }
                                onChange={ (value) => this.setState({...this.state, playlistName : value }) }
                                changeOnEnter={false}
                />

            </Dialog>
        );
    }

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

}

SavePlaylistDialog.propTypes = {
    title : PropTypes.string,
    onConfirm : PropTypes.func,
    onCancel : PropTypes.func,
    hierarchicalPlaylists : PropTypes.array,
    playlist: playlistPropType
};
SavePlaylistDialog.defaultProps = {
    title : "Sauvegarde de la playlist"
};

export default SavePlaylistDialog;