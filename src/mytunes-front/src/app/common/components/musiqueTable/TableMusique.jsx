import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {assign} from "lodash";
import {Icon} from "@material-ui/core";
import VirtualizeTable from "../../../common/components/virtualizeTable/VirtualizeTable";
import {compareProperty} from "../../../common/util/Comparators";
import {formateDuree} from "../../../common/util/Formatters";
import StateBar from "../../../common/components/stateBar/StateBar";
import {MusiqueRenderer} from "../../renderer/MusiqueRenderer";
import {musiquePropType} from "../../types/MusiqueType";
import {genrePropType} from "../../types/GenreType";
import MusiquesActions from "../../../pages/listeMusique/actions/MusiquesActions";
import PlaylistManagerActions from "../../actions/PlaylistManagerActions";
import ControlledTextField from "../input/ControlledTextField";

import './tableMusiques.css';

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Object.defineProperty(Array.prototype, "sum", {
    value: function() {
        return this.reduce(function(sum, item) { return sum + item; }, 0);
    }
});

class TableMusique extends React.Component {

    constructor(props) {
        super(props);

        this._sortProperty = this._sortProperty.bind(this);
        this._searchMusique = this._searchMusique.bind(this);
        this._addMusiqueToPlaylist = this._addMusiqueToPlaylist.bind(this);

        this.state = {
            searchText: '',
            musiqueRenderers: this._mapMusiqueRenderer(this.props.musiques, {
                onPropertyChange: this._onPropertyChange.bind(this),
                onPlaylistAdd: this._addMusiqueToPlaylist
            }, this.props.genres),
            sortProperties : {
                order : "ASC",
                property : "titre"
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.playlistManager !== nextProps.playlistManager && nextProps.playlistManager && this.props.wsClient) {
            const { playlistManager } = this.props;
            const newPlaylistManager = playlistManager.playlist ?
                { ...playlistManager, playlist : { ...playlistManager.playlist, parent : null } } :
                playlistManager;

            this.props.wsClient.send("/app/action/lecteur/setCurrentPlaylist", newPlaylistManager);
        }
    }

    render() {
        let filteredMusiqueRenderers = [];
        if (this.state.musiqueRenderers) {
            filteredMusiqueRenderers = this._getFilteredMusiques();
        }

        return (
            <section id="tableMusiques">
                <section id="searchMusique">
                    <Icon className="material-icons">search</Icon>
                    <ControlledTextField classes={{ root : "textField"}}
                               name={"search"}
                               placeholder={"Recherche"}
                               onEnter={ value => this._searchMusique(value) }
                               blurOnEnter={false}
                    />
                </section>
                <VirtualizeTable headers={this.props.headers}
                                 data={filteredMusiqueRenderers}
                                 sortableColumnsProperties={this.props.sortableColumnsProperties}
                                 sortedColumn={1}
                                 onSortDatas={ (property, order) => this._sortProperty(property, order) }
                />
                <StateBar>
                    { filteredMusiqueRenderers.length } musique{ filteredMusiqueRenderers.length > 1 ? "s" : "" }
                    &nbsp;-&nbsp;Durée totale : { formateDuree(filteredMusiqueRenderers.map(musiqueRenderer => musiqueRenderer.musique.duree).sum()) }
                </StateBar>

            </section>
        );
    }

    _getFilteredMusiques() {
        const {musiqueRenderers, searchText, sortProperties} = this.state;
        let filteredMusiques = [...musiqueRenderers];

        if (searchText) {
            filteredMusiques = filteredMusiques.filter(musiqueRenderer => musiqueRenderer.musique.searchText.indexOf(searchText.toLowerCase()) >= 0);
        }

        if (sortProperties) {
            filteredMusiques = filteredMusiques.sort((a, b) => {
                return compareProperty(a.musique, b.musique, sortProperties.property, sortProperties.order);
            });
        }

        return filteredMusiques;
    }

    _searchMusique(text) {
        this.setState({
            ...this.state,
            searchText: text
        });
    }

    _sortProperty(property, order) {
        this.setState({
            ...this.state,
            sortProperties : {
                order,
                property
            }
        });
    }

    _mapMusiqueRenderer = (musiques, {onPropertyChange, onPlaylistAdd}, genres) => {
        return musiques.map((musique, index) => {
            return new MusiqueRenderer(musique, index, {onPropertyChange, onPlaylistAdd}, genres)
        });
    };

    _addMusiqueToPlaylist(musique) {
        this.props.playlistManagerActions.addMusiqueToPlaylist(musique, this.props.playlistManager.playlist);
    }

    _onPropertyChange(property, newValue, index) {
        const musiqueRenderers = this.state.musiqueRenderers;
        const musiqueRenderer = musiqueRenderers[index];

        if (musiqueRenderer.musique.isFetching[property] || musiqueRenderer.musique[property] === newValue) {
            return;
        }

        const modifiedMusiqueRenderers = [...musiqueRenderers];
        modifiedMusiqueRenderers[index].fetching(property, true);

        // Fetching (grey)
        this.setState({
            ...this.state,
            musiqueRenderers: modifiedMusiqueRenderers
        }, () => {
            const musique = musiqueRenderer.musique;
            this.props.musiquesActions.updateMusique(musique, property, newValue)
                .then(() => {
                    const modifiedMusiqueRenderers = [...this.state.musiqueRenderers];
                    modifiedMusiqueRenderers[index].changeProperty(property, newValue);
                    modifiedMusiqueRenderers[index].fetching(property, false);

                    this.setState({
                        ...this.state,
                        musiqueRenderers: modifiedMusiqueRenderers
                    });
                })
                .catch(() => {
                    modifiedMusiqueRenderers[index].fetching(property, false);

                    this.setState({
                        ...this.state,
                        musiqueRenderers: modifiedMusiqueRenderers
                    });
                });
        });
    }

}

TableMusique.propTypes = {
    musiques: PropTypes.arrayOf(musiquePropType).isRequired,
    genres: PropTypes.arrayOf(genrePropType).isRequired,
    headers: PropTypes.array.isRequired,
    sortableColumnsProperties: PropTypes.array.isRequired
};


export default connect(state => assign({}, {
    genres: state.genres,
    playlistManager: state.playlistManager,
    wsClient: state.wsClient
}), dispatch => ({
    musiquesActions: bindActionCreators(MusiquesActions, dispatch),
    playlistManagerActions: bindActionCreators(PlaylistManagerActions, dispatch)
}))(TableMusique);
