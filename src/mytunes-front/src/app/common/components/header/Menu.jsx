import React from 'react';
import {Icon} from "@material-ui/core";
import {Drawer, IconButton, MenuItem, Divider} from "material-ui";
import {Link} from "react-router-dom";
import {__DESKTOP_URL__} from "../../../../App";

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.setMenuOpeness = this.setMenuOpeness.bind(this);
        this.state = {
            open: false
        };
    }

    toggleMenu() {
        this.setState({
            ...this.state,
            open: !this.state.open
        })
    }

    setMenuOpeness(open) {
        this.setState({
            ...this.state,
            open
        })
    }

    closeMenu() {
        this.setMenuOpeness(false);
    }

    render() {
        return (
            <div id={"menuIcon"}>
                <IconButton onClick={this.toggleMenu}>
                    <Icon className="material-icons">
                        menu
                    </Icon>
                </IconButton>
                <Drawer
                    docked={false}
                    width={250}
                    open={this.state.open}
                    className={"mainMenu menuDrawer"}
                    onRequestChange={this.setMenuOpeness}
                >
                    <MenuItem containerElement={<Link to={__DESKTOP_URL__ + "/musiques"}/>} onClick={this.closeMenu}>
                        <Icon className="material-icons">library_music</Icon>
                        Liste musiques
                    </MenuItem>
                    <MenuItem containerElement={<Link to={__DESKTOP_URL__ + "/genres"}/>} onClick={this.closeMenu}>
                        <Icon className="material-icons">view_module</Icon>
                        Liste par genre
                    </MenuItem>
                    <Divider/>
                    <MenuItem containerElement={<Link to={__DESKTOP_URL__ + "/playlists"}/>} onClick={this.closeMenu}>
                        <Icon className="material-icons">list</Icon>
                        Playlists
                    </MenuItem>
                    <MenuItem onClick={this.closeMenu}>
                        <Icon className="material-icons">playlist_add_check</Icon>
                        Playlists intelligentes
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={this.closeMenu}>
                        <Icon className="material-icons">import_export</Icon>
                        Import / export
                    </MenuItem>
                    <Divider/>
                    <MenuItem containerElement={<Link to={__DESKTOP_URL__ + "/parametres"}/>} onClick={this.closeMenu}>
                        <Icon className="material-icons">settings</Icon>
                        Paramètres
                    </MenuItem>
                </Drawer>
            </div>
        );
    }
}

Menu.propTypes = {};
