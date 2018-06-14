import React from 'react';
import { Page, Toolbar, BottomToolbar, Button } from 'react-onsenui';
import * as ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const MobileWrapper = () => {

    const _renderToolbar = () => {
        return (
            <Toolbar>
                <div className='center'>Mytunes</div>
            </Toolbar>
        );
    };

    const _renderBottomToolbar = () => {
        return (
            <BottomToolbar aligned={"center"} modifier="material">
                Content
            </BottomToolbar>
        );
    };

    const _handleClick = () => {
        ons.notification.alert('Hello world!');
    };

    return (
        <Page renderToolbar={_renderToolbar} renderBottomToolbar={_renderBottomToolbar}>
            <p>https://onsen.io/v2/api/react/</p>
            <p>https://onsen.io/v2/api/angular2/ons.notification.html</p>
            <Button onClick={_handleClick}>Push button</Button>
        </Page>
    );
};

export default MobileWrapper;