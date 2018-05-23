import React from "react";
import MusiquesActions from "../listeMusique/actions/MusiquesActions";
import LoadingActions from "../../common/actions/LoadingActions";
import GenreActions from "../../common/actions/GenreActions";
import {assign} from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {RefreshIndicator} from "material-ui";
import PlaylistsActions from "../savedPlaylists/actions/PlaylistsActions";

class MainWrapper extends React.Component {

    componentDidMount() {
        this.props.musiquesActions.getAllMusiques();
        this.props.playlistsActions.getAllPlaylists();
        this.props.genreActions.getGenres();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoading && nextProps.isLoading && this.isApplicationLoaded(nextProps)) {
            this.props.loadingActions.setIsLoading(false);
        }
    }

    render() {
        return (
            <main style={{position: 'relative'}}>
                {this.props.isLoading ?
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

    isApplicationLoaded(props) {
        return props.musiques && props.genres && props.playlistProvider && props.playlistProvider.getPlaylists().length;
    }
}

export default connect(state => assign({}, {
        musiques: state.musiques,
        genres: state.genres,
        playlistProvider: state.playlistProvider,
        isLoading: state.isLoading
    }),
    dispatch => ({
        musiquesActions: bindActionCreators(MusiquesActions, dispatch),
        playlistsActions: bindActionCreators(PlaylistsActions, dispatch),
        loadingActions: bindActionCreators(LoadingActions, dispatch),
        genreActions: bindActionCreators(GenreActions, dispatch)
    }))(MainWrapper);
