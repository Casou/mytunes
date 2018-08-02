import React from 'react';
import { Page, Splitter,SplitterContent } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";

import "../../../style/components/mobile/main.css";
import Menu from "./common/components/Menu";
import VolumeSlider from "./common/components/VolumeSlider";
import CurrentPlaylist from "./pages/currentPlaylist/container/MobileCurrentPlaylist";
import Playlists from "./pages/Playlists";
import PlaylistManagerActions from "../../common/actions/PlaylistManagerActions";

export const __MOBILE_URL__ = '/mobile';

class MobileWrapper extends React.Component {

    state = {
        isLocked : true
    };

    constructor(props) {
        super(props);
        this.menuRef = null;

        this._toggleLock = this._toggleLock.bind(this);
        this._loadProperties = this._loadProperties.bind(this);

        window.addEventListener('visibilitychange', () => this._toggleLock(true));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.wsClient !== nextProps.wsClient && nextProps.wsClient) {
            nextProps.wsClient.subscribe("/topic/lecteur/setCurrentPlaylist", "MobileWrapper",
                (currentPlaylistManager) => this.props.playlistManagerActions.setPlaylistManager(currentPlaylistManager));
            this._loadProperties(nextProps.wsClient);
        }
    }

    // _handleClick = () => {
    //     ons.notification.alert('Hello world!');
    // };

    _loadProperties(propsWsClient) {
        const wsClient = propsWsClient || this.props.wsClient;
        wsClient.send("/app/action/lecteur/getCurrentPlaylist", {});
    }

    render() {
        return (
            <Splitter>
                <Menu ref={ instance => this.menuRef = instance } refresh={this._loadProperties} />
                <SplitterContent>
                    <Page renderToolbar={() => <Header toggleMenu={ this.menuRef && this.menuRef.toggleMenu }
                                                       isLocked={!this.state.isLocked}
                                                       onToggleLock={ event => this._toggleLock(!event.target.checked) } />}
                          renderBottomToolbar={() => <Footer isLocked={this.state.isLocked}
                                                             musique={ this.props.playlistManager.musiquePlaying }
                                                     />}>

                        <section id={"mainPageContent"}>
                            <Route exact path={__MOBILE_URL__} component={CurrentPlaylist}/>
                            <Route exact path={__MOBILE_URL__ + "/playlists"} component={Playlists}/>
                        </section>

                        <VolumeSlider isLocked={this.state.isLocked} />
                    </Page>
                </SplitterContent>
            </Splitter>
        );
    }

    _toggleLock(isLocked) {
        this.setState({
            ...this.state,
            isLocked
        });
    }

}

export default connect(state => assign({}, {
    wsClient: state.wsClient,
    playlistManager : state.playlistManager
}), dispatch => ({
    playlistManagerActions: bindActionCreators(PlaylistManagerActions, dispatch)
}))(MobileWrapper);
