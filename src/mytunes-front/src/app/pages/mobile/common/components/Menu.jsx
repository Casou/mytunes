import React from 'react';
import PropTypes from 'prop-types';
import { Page, SplitterSide, List, ListItem } from 'react-onsenui';

class Menu extends React.Component {
    state = {
        isMenuOpen : false
    };

    toggleMenu = () => {
        this.setState({
            ...this.state,
            isMenuOpen : !this.state.isMenuOpen
        });
    };
    _showMenu = () => { this.setState({ ...this.state, isMenuOpen : true }); };
    _hideMenu = () => { this.setState({ ...this.state, isMenuOpen : false }); };

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
                    <List dataSource={['Profile', 'Followers', 'Settings']}
                          renderRow={(title) => (
                              <ListItem key={title} onClick={this._hideMenu} tappable>{title}</ListItem>
                          )}
                    />
                </Page>
            </SplitterSide>
        );
    }
}

Menu.propTypes = {};
Menu.defaultProps = {};

export default Menu;