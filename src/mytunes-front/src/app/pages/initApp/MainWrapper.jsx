import React from "react";
import MusiquesActions from "../listeMusique/actions/MusiquesActions";
import LoadingActions from "../../common/actions/LoadingActions";
import GenreActions from "../../common/actions/GenreActions";
import {assign} from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {RefreshIndicator} from "material-ui";
import PlaylistsActions from "../savedPlaylists/actions/PlaylistsActions";
import Loading from "../../common/components/loading/Loading";

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
    }

    render() {
        const isLoading = !this._isApplicationLoaded(this.props);
        return (
            <main style={{position: 'relative'}}>
                <Loading open={this.props.isLoading.general} onForceClose={this._forceCloseGeneralLoading.bind(this)} />
                { isLoading ?
                    <RefreshIndicator
                        size={70}
                        left={-35}
                        top={35}
                        loadingColor="#808080"
                        status="loading"
                        style={{marginLeft: '50%'}}
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
    isLoading: state.isLoading,
    wsClient: state.wsClient
}),
dispatch => ({
    musiquesActions: bindActionCreators(MusiquesActions, dispatch),
    playlistsActions: bindActionCreators(PlaylistsActions, dispatch),
    loadingActions: bindActionCreators(LoadingActions, dispatch),
    genreActions: bindActionCreators(GenreActions, dispatch)
}))(MainWrapper);
