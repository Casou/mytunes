import React from "react";
import PropTypes from "prop-types";
import {FontIcon, IconButton} from "material-ui";
import cn from 'classnames';
import { TextField } from "material-ui";
import ConfirmDialog from "../../confirm/ConfirmDialog";
import {playlistManagerPropType} from "../../../types/PlaylistMusiqueType";
import {__KEYCODE_ENTER__} from "../../../../../App";

const PlaylistHeader = (props) => (
    <header>
        <div id="playlistMenuHeaderLeftButtons">
            <IconButton onClick={ props.onToggleShuffle }>
                <FontIcon className={cn("material-icons", { "active" : props.shuffle})}>shuffle</FontIcon>
            </IconButton>
        </div>
        <div id="playlistMenuHeaderTitle" title={ props.playlistManager && props.playlistManager.playlist ? props.playlistManager.playlist.nom : "" }>
            { props.playlistManager && props.playlistManager.playlist ?
                <TextField className="textField" name={"search"} placeholder={"Recherche"}
                           defaultValue={ props.playlistManager.playlist.nom }
                           onKeyPress={e => {
                               if (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__) {
                                   props.onChangePlaylistName(props.playlistManager.playlist.id, e.target.value);
                               }
                           }}
                />
                : "" }
        </div>
        <div id="playlistMenuHeaderRightButtons">
            <IconButton onClick={ props.loadPlaylist }>
                <FontIcon className={"material-icons"}>input</FontIcon>
            </IconButton>
            <IconButton className="savePlaylist">
                <FontIcon className={cn("material-icons", { "active" : props.playlistManager && props.playlistManager.hasChanges })}>
                    save
                </FontIcon>
            </IconButton>
            <IconButton className="clearPlaylist" onClick={ () => this.confirmCleanPlaylist.handleOpen() }>
                <FontIcon className={ "material-icons" }>delete_sweep</FontIcon>
            </IconButton>
            <ConfirmDialog ref={instance => this.confirmCleanPlaylist = instance }
                           message={"Voulez-vous vider la playlist ?"}
                           onConfirm={ props.onClearPlaylist } />
        </div>
    </header>
);

PlaylistHeader.propTypes = {
    shuffle : PropTypes.bool.isRequired,
    onToggleShuffle : PropTypes.func.isRequired,
    onClearPlaylist : PropTypes.func.isRequired,
    onLoadPlaylist : PropTypes.func.isRequired,
    playlistManager : playlistManagerPropType,
    onChangePlaylistName : PropTypes.func.isRequired
};

export default PlaylistHeader;