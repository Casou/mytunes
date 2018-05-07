import React from "react";
import PropTypes from "prop-types";
import {FontIcon, IconButton} from "material-ui";
import cn from 'classnames';
import ConfirmDialog from "../confirm/ConfirmDialog";

const PlaylistHeader = (props) => (
    <header>
        <div id="playlistMenuHeaderLeftButtons">
            <IconButton onClick={ props.onToggleShuffle }>
                <FontIcon className={cn("material-icons", { "active" : props.shuffle})}>shuffle</FontIcon>
            </IconButton>
        </div>
        <div id="playlistMenuHeaderRightButtons">
            <IconButton className="savePlaylist">
                <FontIcon className={ "material-icons" }>save</FontIcon>
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
    onClearPlaylist : PropTypes.func.isRequired
};

export default PlaylistHeader;