import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarButton, Icon, Switch } from 'react-onsenui';
import '../../../../../style/components/mobile/header.css';

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
                <Switch checked={ props.isLocked } onChange={ props.onToggleLock } />
            </div>
        </Toolbar>
    );
};

Header.propTypes = {
    isLocked : PropTypes.bool.isRequired,
    toggleMenu : PropTypes.func,
    onToggleLock : PropTypes.func.isRequired
};
Header.defaultProps = {};

export default Header;