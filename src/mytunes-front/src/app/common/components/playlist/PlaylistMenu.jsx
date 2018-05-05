import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Drawer, IconButton} from "material-ui";
import {connect} from "react-redux";
import {assign} from "lodash";
import PropTypes from "prop-types";
import cn from "classnames";

import PlaylistItem from "./PlaylistItem";

import '../../../../style/components/playlistMenu.css';
import {playlistMusiquePropType} from "../../types/PlaylistMusique";

class PlaylistMenu extends React.Component {
    constructor(props) {
        super(props);

        this._toggleMenu = this._toggleMenu.bind(this);
        this._toggleShuffle = this._toggleShuffle.bind(this);
        this._closeMenu = this._closeMenu.bind(this);
        this._setMenuOpeness = this._setMenuOpeness.bind(this);
        this.state = {
            open: false,
            shuffle: false
        };
    }

    render() {
        const {open, musiquePlaying, shuffle} = this.state;
        const {playlist} = this.props;

        return (
            <div id={"playlistMenuIcon"}>
                <IconButton onClick={this._toggleMenu}>
                    <FontIcon className="material-icons">
                        playlist_play
                    </FontIcon>
                </IconButton>
                <Drawer
                    docked={true}
                    width={350}
                    open={open}
                    className={"playlistMenu menuDrawer"}
                    onRequestChange={this._setMenuOpeness}
                    openSecondary={true}
                >
                    <div id="playlistMenu">
                        <header>
                            <IconButton onClick={this._toggleShuffle}>
                                <FontIcon className={cn("material-icons", { "active" : shuffle})}>shuffle</FontIcon>
                            </IconButton>
                            <IconButton className="clearPlaylist">
                                <FontIcon className={ "material-icons" }>delete_sweep</FontIcon>
                            </IconButton>

                        </header>
                        <ul className="playlistMusiqueList">
                            {playlist.map(musique => {
                                return (
                                    <PlaylistItem key={"playlist_" + musique.itunesId}
                                                  musique={musique}
                                                  isPlaying={musique === musiquePlaying}
                                                  alreadyPlayed={musique.alreadyPlayed}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                </Drawer>
            </div>
        );
    }

    _toggleMenu() {
        this.setState({
            ...this.state,
            open: !this.state.open
        })
    }

    _toggleShuffle() {
        this.setState({
            ...this.state,
            shuffle: !this.state.shuffle
        })
    }

    _setMenuOpeness(open) {
        this.setState({
            ...this.state,
            open
        })
    }

    _closeMenu() {
        this._setMenuOpeness(false);
    }

}

PlaylistMenu.propTypes = {
    playlist: PropTypes.arrayOf(playlistMusiquePropType).isRequired
};

export default connect(state => assign({}, {
    playlist: state.playlist
}), null)(PlaylistMenu);