import React from 'react';
import { Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import {__DESKTOP_URL__, __MOBILE_URL__} from "../../../App";

const RouteWrapper = () => {
    if (isMobile) {
        return <Redirect to={ __MOBILE_URL__ } />
    }
    return <Redirect to={ __DESKTOP_URL__ } />
};

export default RouteWrapper;