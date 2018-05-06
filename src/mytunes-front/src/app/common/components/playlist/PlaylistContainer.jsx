import React from "react";
import { FontIcon, IconButton } from "material-ui";
import cn from "classnames";
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";

import {playlistManagerPropType} from "../../types/PlaylistMusique";
import PlaylistItem from "./PlaylistItem";
import PlaylistActions from "../../actions/PlaylistActions";

class PlaylistContainer extends React.Component {
    constructor(props) {
        super(props);
        this._playMusique = this._playMusique.bind(this);
    }

    render() {
        const { playlistManager } = this.props;
        const musiquePlaying = playlistManager.musiquePlaying;

        return (
            <div id="playlistMenu">
                <header>
                    <IconButton onClick={ this._toggleShuffle.bind(this) }>
                        <FontIcon className={cn("material-icons", { "active" : playlistManager.shuffle})}>shuffle</FontIcon>
                    </IconButton>
                    <IconButton className="clearPlaylist">
                        <FontIcon className={ "material-icons" }>delete_sweep</FontIcon>
                    </IconButton>

                </header>
                <ul className="playlistMusiqueList">
                    {playlistManager.musiques.map(musique => {
                        return (
                            <PlaylistItem key={"playlist_" + musique.itunesId}
                                          musique={musique}
                                          isPlaying={musique === musiquePlaying}
                                          alreadyPlayed={musique.alreadyPlayed}
                                          playMusique={ this._playMusique }
                            />
                        );
                    })}
                </ul>
            </div>
        );
    }

    _playMusique(musique) {
        this.props.playlistActions.playMusique(musique);
    }

    _toggleShuffle() {
        this.props.playlistManager.toggleShuffle();
        this.forceUpdate();
    }

}

PlaylistContainer.propTypes = {
    playlistManager: playlistManagerPropType.isRequired
};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager
}), dispatch => ({
    playlistActions: bindActionCreators(PlaylistActions, dispatch)
}))(PlaylistContainer);