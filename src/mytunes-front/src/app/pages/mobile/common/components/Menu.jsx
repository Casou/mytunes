import React from 'react';
import PropTypes from 'prop-types';
import { Page, SplitterSide, List, ListItem } from 'react-onsenui';
import {Icon} from "@material-ui/core";
import {Link} from "react-router-dom";

import '../style/Menu.css';
import {__MOBILE_URL__} from "../../MobileWrapper";

class Menu extends React.Component {
    state = {
        isMenuOpen : false
    };

    items = [
        { title : 'En cours', divider : true, page : __MOBILE_URL__, icon : 'play_circle_filled' },
        { title : 'Genres', divider : false, page : __MOBILE_URL__ + '/genres', icon : 'view_module' },
        { title : 'Playlists', divider : true, page : __MOBILE_URL__ + '/playlists', icon : 'library_music' },
        { title : 'Recharger', divider : false, page : null, icon : 'compare_arrows', onClick : this.props.refresh },
        { title : 'Actualiser', divider : false, page : null, icon : 'refresh', onClick : () => { window.location.reload(); } }
    ];

    toggleMenu = () => {
        this.setState({
            ...this.state,
            isMenuOpen : !this.state.isMenuOpen
        });
    };
    _showMenu = () => { this.setState({ ...this.state, isMenuOpen : true }); };
    _hideMenu = () => { this.setState({ ...this.state, isMenuOpen : false }); };

    _renderRow = (item) => {
        const itemRendered = <ListItem key={item.title}
                                onClick={() => this._clickItem(item)}
                                modifier={item.divider ? "longdivider" : null}
                                tappable>
            <Icon className="material-icons">{item.icon}</Icon>
            {item.title}
        </ListItem>;

        if (item.page) {
            return (
                <Link key={ "link_" + item.title } to={ item.page }>
                    { itemRendered }
                </Link>
            );
        }

        return itemRendered;
    };

    _clickItem = (item) => {
        if (item.onClick) {
            item.onClick();
        }
        this._hideMenu();
    };

    render() {
        return (
            <SplitterSide style={{
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
            }}
                          side='left'
                          width={200}
                          collapse={true}
                          swipeable={true}
                          isOpen={this.state.isMenuOpen}
                          onClose={this._hideMenu}
                          onOpen={this._showMenu}>
                <Page>
                    <List dataSource={this.items}
                          renderRow={this._renderRow}
                    />
                </Page>
            </SplitterSide>
        );
    }
}

Menu.propTypes = {
    refresh : PropTypes.func.isRequired
};
Menu.defaultProps = {};

export default Menu;