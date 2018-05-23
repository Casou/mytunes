import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, FlatButton } from "material-ui";
import '../../../../../style/components/loadPlaylistDialog.css';
import PlaylistTreeView from "../component/PlaylistTreeView";

class LoadPlaylistDialog extends React.Component {
    state = {
        open: false,
        chosenPlaylistId : null,
        filterValue : ""
    };

    handleOpen = () => { this.setState({...this.state, open: true}); };
    handleClose = () => { this.setState({...this.state, open: false}); };
    _choosePlaylist = (playlistId) => { this.setState({...this.state, chosenPlaylistId: playlistId}); };

    _filterPlaylists() {
        const { filterValue } = this.state;
        let filteredPlaylist = this.props.playlistProvider.playlists ? [...this.props.playlistProvider.playlists] : [];
        if (filterValue) {
            filteredPlaylist = filteredPlaylist.filter(playlist => playlist.nom.indexOf(filterValue) >= 0);
        }
        return filteredPlaylist;
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
                label="Séletionner"
                primary={true}
                disabled={this.state.chosenPlaylistId === null}
                onClick={ () => {
                    if (this.props.onSelectPlaylist) {
                        this.props.onSelectPlaylist();
                    }
                    this.handleClose();
                }}
            />,
        ];

        let buttonNewPlaylist = "";

        if (this.props.onNewPlaylist) {
            buttonNewPlaylist = <FlatButton
                label="Nouvelle playlist"
                primary={true}
                onClick={() => {
                    this.props.onNewPlaylist();
                    this.handleClose();
                }}
            />;
        }

        const title = <header>
            <h3>{ this.props.title ? this.props.title : "Chargement d'une playlist" }</h3>
            { buttonNewPlaylist }
        </header>;

        const filteredPlaylists = this._filterPlaylists();

        return (
            <Dialog
                className={"loadPlaylistDialog"}
                title={ title }
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
            >
                <section>
                    {
                        filteredPlaylists ?
                            <PlaylistTreeView playlists={ filteredPlaylists }
                                              onChoosePlaylist={ this._choosePlaylist.bind(this) }
                                              onFilter={ (value) => this.setState({...this.state, filterValue : value}) }
                            /> :
                            "Aucune playlist"
                    }
                </section>
            </Dialog>
        );
    }
}

LoadPlaylistDialog.propTypes = {
    title : PropTypes.string,
    playlistProvider : PropTypes.object.isRequired,
    onSelectPlaylist : PropTypes.func.isRequired,
    onNewPlaylist : PropTypes.func.isRequired,
    onCancel : PropTypes.func
};

export default LoadPlaylistDialog;