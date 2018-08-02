import React from 'react';
import PropTypes from 'prop-types';
import {RefreshIndicator} from "material-ui";

import greenLight from '../../../images/green-light.png';
import redLight from '../../../images/red-light.png';
import './init.css';

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
                <li><img alt={"[light]"} src={props.genres ? greenLight : redLight} /> Genres{ props.genres && " : " + props.genres.length }</li>
                <li><img alt={"[light]"} src={props.musiques ? greenLight : redLight} /> Musiques{ props.musiques && " : " + props.musiques.length }</li>
                <li><img alt={"[light]"} src={props.playlists ? greenLight : redLight} /> Playlists{ props.playlists && " : " + props.playlists.length }</li>
                <li><img alt={"[light]"} src={props.wsClient && props.wsClient.isConnected() ? greenLight : redLight} /> WS Client connecté</li>
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