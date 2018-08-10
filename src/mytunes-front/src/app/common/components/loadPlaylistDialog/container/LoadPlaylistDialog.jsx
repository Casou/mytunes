import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { FlatButton } from "material-ui";
import '../style/loadPlaylistDialog.css';
import LoadPlaylistTreeView from "../component/LoadPlaylistTreeView";

class LoadPlaylistDialog extends React.Component {
    state = {
        open: false,
        chosenPlaylistId : null
    };

    handleOpen = () => { this.setState({...this.state, open: true}); };
    handleClose = () => { this.setState({...this.state, open: false}); };
    _choosePlaylist = (playlistId) => { this.setState({...this.state, chosenPlaylistId: playlistId}); };

    render() {
        const actions = [
            <FlatButton key={"loadPlaylistDialog_cancelButton"}
                        label="Annuler"
                        primary={false}
                        onClick={ () => {
                            if (this.props.onCancel) {
                                this.props.onCancel();
                            }
                            this.handleClose();
                        }}
            />,
            <FlatButton key={"loadPlaylistDialog_okButton"}
                        label="Séletionner"
                        primary={true}
                        disabled={this.state.chosenPlaylistId === null}
                        onClick={ () => {
                            if (this.props.onSelectPlaylist) {
                                this.props.onSelectPlaylist(this.state.chosenPlaylistId);
                            }
                            this.handleClose();
                        }}
            />,
        ];

        let buttonNewPlaylist = "";

        if (this.props.onNewPlaylist) {
            buttonNewPlaylist =
                <FlatButton key={"loadPlaylistDialog_newPlaylistButton"}
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
                classes={{
                    root : "loadPlaylistDialog",
                    paper : "loadPlaylistDialog_paper"
                }}
                open={this.state.open}
                onClose={this.handleClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <section>
                        <LoadPlaylistTreeView playlistProvider={ this.props.playlistProvider }
                                              onChoosePlaylist={ this._choosePlaylist.bind(this) }
                                              onFilter={ () => this.setState({...this.state, chosenPlaylistId : null}) }
                        />
                    </section>
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
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