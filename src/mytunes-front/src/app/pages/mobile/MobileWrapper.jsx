import React from 'react';
import { Page, Button, Splitter,SplitterContent } from 'react-onsenui';
// import * as ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";
import {Route} from "react-router-dom";

import "../../../style/components/mobile/main.css";
import Menu from "./common/components/Menu";
import VolumeSlider from "./common/components/VolumeSlider";
import CurrentPlaylist from "./pages/CurrentPlaylist";
import Playlists from "./pages/Playlists";

class MobileWrapper extends React.Component {

    state = {
        isLocked : true
    };

    constructor(props) {
        super(props);
        this.menuRef = null;

        this._toggleLock = this._toggleLock.bind(this);

        window.addEventListener('visibilitychange', () => this._toggleLock(true));
    }

    // _handleClick = () => {
    //     ons.notification.alert('Hello world!');
    // };

    render() {
        return (
            <Splitter>
                <Menu ref={ instance => this.menuRef = instance }/>
                <SplitterContent>
                    <Page renderToolbar={() => <Header toggleMenu={ this.menuRef && this.menuRef.toggleMenu }
                                                       isLocked={!this.state.isLocked}
                                                       onToggleLock={ event => this._toggleLock(!event.target.checked) } />}
                          renderBottomToolbar={() => <Footer isLocked={this.state.isLocked} />}>

                        <Route exact path="/mobile" component={CurrentPlaylist}/>
                        <Route exact path="/mobile/playlists" component={Playlists}/>

                        <VolumeSlider isLocked={this.state.isLocked} />
                    </Page>
                </SplitterContent>
            </Splitter>
        );
    }

    _toggleLock(isLocked) {
        console.log("toggle", isLocked);
        this.setState({
            ...this.state,
            isLocked
        });
    }

}

export default MobileWrapper;