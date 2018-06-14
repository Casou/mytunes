import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Drawer, IconButton, MenuItem, Divider} from "material-ui";
import {Link} from "react-router-dom";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.setMenuOpeness = this.setMenuOpeness.bind(this);
    this.state = {
      open : false
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
        <IconButton onClick={ this.toggleMenu }>
          <FontIcon className="material-icons">menu</FontIcon>
        </IconButton>
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          className={ "mainMenu menuDrawer" }
          onRequestChange={ this.setMenuOpeness }
        >
          <MenuItem containerElement={<Link to="/desktop/musiques" />} onClick={ this.closeMenu }>
            <FontIcon className="material-icons">library_music</FontIcon>
            Liste musiques
          </MenuItem>
          <MenuItem containerElement={<Link to="/desktop/genres" />} onClick={ this.closeMenu }>
            <FontIcon className="material-icons">view_module</FontIcon>
            Liste par genre
          </MenuItem>
          <Divider />
          <MenuItem containerElement={<Link to="/desktop/playlists" />} onClick={ this.closeMenu }>
              <FontIcon className="material-icons">list</FontIcon>
              Playlists
          </MenuItem>
          <MenuItem onClick={ this.closeMenu }>
              <FontIcon className="material-icons">playlist_add_check</FontIcon>
              Playlists intelligentes
          </MenuItem>
          <Divider />
            <MenuItem onClick={ this.closeMenu }>
                <FontIcon className="material-icons">import_export</FontIcon>
                Import / export
            </MenuItem>
          <Divider />
          <MenuItem containerElement={<Link to="/desktop/parametres" />} onClick={ this.closeMenu }>
              <FontIcon className="material-icons">settings</FontIcon>
              Paramètres
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

Menu.propTypes = {
};
