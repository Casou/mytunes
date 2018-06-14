import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarButton, Icon } from 'react-onsenui';

const Header = (props) => {
    return (
        <Toolbar>
            <div className='left'>
                <ToolbarButton onClick={ props.toggleMenu }>
                    <Icon icon='ion-navicon, material:md-menu' />
                </ToolbarButton>
            </div>
            <div className='center'>Mytunes</div>
        </Toolbar>
    );
}

Header.propTypes = {
    toggleMenu : PropTypes.func.isRequired
};
Header.defaultProps = {};

export default Header;