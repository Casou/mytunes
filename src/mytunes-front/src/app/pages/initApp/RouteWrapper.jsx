import React from 'react';
import { Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const RouteWrapper = () => {
    if (isMobile) {
        return <Redirect to='/mobile' />
    }
    return <Redirect to='/desktop' />
};

export default RouteWrapper;