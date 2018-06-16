import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarButton, Icon, Switch } from 'react-onsenui';

const Header = (props) => {
    return (
        <Toolbar>
            <div className='left'>
                <ToolbarButton onClick={ props.toggleMenu }>
                    <Icon icon='ion-navicon, material:md-menu' />
                </ToolbarButton>
            </div>
            <div className='center'>Mytunes</div>
            <div className='right'>
                <Switch />
            </div>
        </Toolbar>
    );
}

Header.propTypes = {
    toggleMenu : PropTypes.func
};
Header.defaultProps = {};

export default Header;