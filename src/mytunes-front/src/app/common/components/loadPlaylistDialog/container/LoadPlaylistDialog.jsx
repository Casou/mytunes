import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, FlatButton } from "material-ui";
import '../../../../../style/components/loadPlaylistDialog.css';
import PlaylistTreeView from "../component/PlaylistTreeView";

class LoadPlaylistDialog extends React.Component {
    state = {
        open: false,
        chosenPlaylistId : null
    };

    handleOpen = () => { this.setState({...this.state, open: true}); };
    handleClose = () => { this.setState({...this.state, open: false}); };
    choosePlaylist = (playlistId) => { this.setState({...this.state, chosenPlaylistId: playlistId}); };

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
                        !this.props.playlistProvider || !this.props.playlistProvider.playlists ?
                        "Aucune playlist" :
                        <PlaylistTreeView playlists={ this.props.playlistProvider.playlists }
                                          onChoosePlaylist={ this.choosePlaylist.bind(this) }  />
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