import React from "react";
import MusiquesActions from "../listeMusique/actions/MusiquesActions";
import LoadingActions from "../../common/actions/LoadingActions";
import GenreActions from "../../common/actions/GenreActions";
import {assign} from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PlaylistsActions from "../savedPlaylists/actions/PlaylistsActions";
import Loading from "../../common/components/loading/Loading";
import DesktopLoadingStatus from "./DesktopLoadingStatus";

class MainWrapper extends React.Component {

    componentDidMount() {
        this.props.musiquesActions.getAllMusiques();
        this.props.playlistsActions.getAllPlaylists();
        this.props.genreActions.getGenres();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoading.application && nextProps.isLoading.application && this._isApplicationLoaded(nextProps)) {
            this.props.loadingActions.setIsApplicationLoading(false);
        }

        if (this.props.wsClient !== nextProps.wsClient && nextProps.wsClient) {
            nextProps.wsClient.subscribe("/topic/lecteur/getCurrentPlaylist", "MainWrapper",
                () => {
                    console.log("get");
                    console.log(this.props.playlistManager );
                    nextProps.wsClient.send("/app/action/lecteur/setCurrentPlaylist", this.props.playlistManager );
                });
        }
    }

    render() {
        const isLoading = !this._isApplicationLoaded(this.props);
        return (
            <main style={{position: 'relative'}}>
                <Loading open={this.props.isLoading.general} onForceClose={this._forceCloseGeneralLoading.bind(this)} />
                { isLoading ?
                    <DesktopLoadingStatus musiques={this.props.musiques}
                                          genres={this.props.genres}
                                          playlists={this.props.playlistProvider && this.props.playlistProvider.getPlaylists()}
                                          wsClient={this.props.wsClient}
                    />
                    :
                    this.props.children
                }
            </main>
        )
    }

    _isApplicationLoaded(props) {
        return props.musiques && props.genres &&
            props.playlistProvider &&
            props.playlistProvider.getPlaylists().length &&
            props.wsClient &&
            props.wsClient.isConnected();
    }

    _forceCloseGeneralLoading() {
        this.props.loadingActions.setIsGeneralLoading(false);
    }
}

export default connect(state => assign({}, {
    musiques: state.musiques,
    genres: state.genres,
    playlistProvider: state.playlistProvider,
    playlistManager : state.playlistManager,
    isLoading: state.isLoading,
    wsClient: state.wsClient
}),
dispatch => ({
    musiquesActions: bindActionCreators(MusiquesActions, dispatch),
    playlistsActions: bindActionCreators(PlaylistsActions, dispatch),
    loadingActions: bindActionCreators(LoadingActions, dispatch),
    genreActions: bindActionCreators(GenreActions, dispatch)
}))(MainWrapper);
