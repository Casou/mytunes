import React from 'react';
import PropTypes from 'prop-types';
import { BottomToolbar, Button, Icon, Range } from 'react-onsenui';
import '../../../../../style/components/mobile/footer.css';

const Footer = (props) => {
    return (
        <BottomToolbar aligned={"center"} modifier="material">
            <Button modifier="quiet"><Icon icon={"md-play"} /></Button>
            <div id={"bottomPlayerSlider"}>
                <label>Titre de la musique</label>
                <Range value={70} min={0} max={100} />
            </div>
            <Button modifier="quiet"><Icon icon={"md-skip-previous"} /></Button>
            <Button modifier="quiet"><Icon icon={"md-skip-next"} /></Button>
        </BottomToolbar>
    );
};

Footer.propTypes = {};

export default Footer;