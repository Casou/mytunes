import React from "react";
import PropTypes from "prop-types";
import {FontIcon, IconButton} from "material-ui";
import cn from 'classnames';
import ConfirmDialog from "../../confirm/ConfirmDialog";
import {playlistManagerPropType} from "../../../types/PlaylistMusiqueType";
import LoadPlaylistDialog from "../../loadPlaylistDialog/container/LoadPlaylistDialog";
import TextFieldInput from "../../form/TextFieldInput";
import SavePlaylistDialog from "../container/SavePlaylistDialog";

const PlaylistHeader = (props) => {
    const nomPlaylist = props.playlistManager && props.playlistManager.playlist ? props.playlistManager.playlist.nom : "";

    return (
        <header>
            <div id="playlistMenuHeaderLeftButtons">
                <IconButton onClick={ props.onToggleShuffle }>
                    <FontIcon className={cn("material-icons", { "active" : props.shuffle})}>shuffle</FontIcon>
                </IconButton>
            </div>
            <div id="playlistMenuHeaderTitle" title={ nomPlaylist }>
                { nomPlaylist ?
                    <TextFieldInput key={nomPlaylist}
                                    name={"search"}
                                    placeholder={"Recherche"}
                                    value={ nomPlaylist }
                                    onChange={ props.onChangePlaylistName }
                                    changeOnEnter={true}
                    />
                    : <span id="newPlaylist">Nouvelle playlist</span> }
            </div>
            <div id="playlistMenuHeaderRightButtons">
                <IconButton onClick={ () => {
                    if (props.playlistManager && !props.playlistManager.playlist &&
                        props.playlistManager.musiques.length) {
                        this.confirmLoadPlaylist.handleOpen();
                    } else {
                        this.loadPlaylistDialog.handleOpen();
                    }
                } }>
                    <FontIcon className={"material-icons"}>input</FontIcon>
                </IconButton>
                <ConfirmDialog ref={instance => this.confirmLoadPlaylist = instance }
                               message={"Si vous chargez une nouvelle playlist, les modifications ne seront pas sauvegardées."}
                               onConfirm={ () => this.loadPlaylistDialog.handleOpen() } />
                <LoadPlaylistDialog ref={instance => this.loadPlaylistDialog = instance }
                                    playlistProvider={ props.playlistProvider }
                                    onSelectPlaylist={ props.onLoadPlaylist }
                                    onNewPlaylist={ props.onNewPlaylist }
                />
                <IconButton className="savePlaylist" onClick={ () => this.savePlaylistDialog.handleOpen() }>
                    <FontIcon className={cn("material-icons",
                        { "active" : props.playlistManager && !props.playlistManager.playlist && props.playlistManager.musiques.length })}
                    >
                        save
                    </FontIcon>
                </IconButton>
                <SavePlaylistDialog ref={instance => this.savePlaylistDialog = instance }
                                    onConfirm={ props.onSavePlaylist }
                                    title={ props.playlistManager.playlist ? "Enregistrer sous" : "Enregistrer" }
                                    hierarchicalPlaylists={ props.playlistProvider.getHierarchicalPlaylists() }
                                    playlist={ props.playlistManager.playlist }
                />
                <IconButton className="clearPlaylist" onClick={ () => this.confirmCleanPlaylist.handleOpen() }>
                    <FontIcon className={ "material-icons" }>delete_sweep</FontIcon>
                </IconButton>
                <ConfirmDialog ref={instance => this.confirmCleanPlaylist = instance }
                               message={"Voulez-vous vider la playlist ?"}
                               onConfirm={ props.onClearPlaylist } />
            </div>
        </header>
    );
};

PlaylistHeader.propTypes = {
    shuffle : PropTypes.bool.isRequired,
    onToggleShuffle : PropTypes.func.isRequired,
    onClearPlaylist : PropTypes.func.isRequired,
    onLoadPlaylist : PropTypes.func.isRequired,
    onSavePlaylist : PropTypes.func.isRequired,
    onNewPlaylist : PropTypes.func.isRequired,
    playlistProvider : PropTypes.object.isRequired,
    playlistManager : playlistManagerPropType,
    onChangePlaylistName : PropTypes.func.isRequired
};

export default PlaylistHeader;