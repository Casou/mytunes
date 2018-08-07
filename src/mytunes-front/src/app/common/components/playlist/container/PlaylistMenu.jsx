import React from 'react';
import { Icon } from '@material-ui/core';
import {Drawer, IconButton} from "material-ui";

import '../../../../../style/components/playlistMenu.css';
import PlaylistContainer from "./PlaylistContainer";

class PlaylistMenu extends React.Component {
    constructor(props) {
        super(props);

        this._toggleMenu = this._toggleMenu.bind(this);
        this._closeMenu = this._closeMenu.bind(this);
        this._setMenuOpeness = this._setMenuOpeness.bind(this);
        this.state = {
            open: false
        };
    }

    render() {
        const { open } = this.state;

        return (
            <div id={"playlistMenuIcon"}>
                <IconButton onClick={this._toggleMenu}>
                    <Icon className="material-icons">
                        playlist_play
                    </Icon>
                </IconButton>
                <Drawer
                    docked={true}
                    width={500}
                    open={open}
                    className={"playlistMenu menuDrawer"}
                    onRequestChange={this._setMenuOpeness}
                    openSecondary={true}
                >
                    <PlaylistContainer />
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
};

export default PlaylistMenu;