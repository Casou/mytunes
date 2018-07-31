import React from 'react';
import PropTypes from 'prop-types';
import {RefreshIndicator} from "material-ui";

import greenLight from '../../../images/green-light.png';
import redLight from '../../../images/red-light.png';
import '../../../style/components/init.css';

const DesktopLoadingStatus = (props) => {
    return (
        <div>
            <RefreshIndicator
                size={70}
                left={-35}
                top={35}
                loadingColor="#808080"
                status="loading"
                style={{marginLeft: '50%'}}
            />
            <ul id={"initLoadingState"}>
                <li><img src={props.genres ? greenLight : redLight} /> Genres</li>
                <li><img src={props.musiques ? greenLight : redLight} /> Musiques</li>
                <li><img src={props.playlists ? greenLight : redLight} /> Playlists</li>
                <li><img src={props.wsClient && props.wsClient.isConnected() ? greenLight : redLight} /> WS Client connecté</li>
            </ul>
        </div>);
};

DesktopLoadingStatus.propTypes = {
    musiques : PropTypes.array,
    genres : PropTypes.array,
    playlists : PropTypes.array,
    wsClient : PropTypes.object
};

export default DesktopLoadingStatus;