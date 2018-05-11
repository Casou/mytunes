import React from 'react';
import '../../../../style/components/stateBar.css';

const StateBar = (props) => {
    return (<footer id={"state_bar"}>
        { props.children }
    </footer>);
};

export default StateBar;