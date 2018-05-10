import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {assign} from "lodash";
import {FontIcon, TextField} from "material-ui";

import {musiquePropType} from "../../../common/types/Musique";
import VirtualizeTable from "../../../common/components/virtualizeTable/VirtualizeTable";
import MusiquesActions from "../actions/MusiquesActions";
import PlaylistActions from "../../../common/actions/PlaylistActions";

import {__KEYCODE_ENTER__} from "../../../../App";

import '../../../../style/components/listeMusiques.css';
import {MusiqueRenderer} from "../renderer/MusiqueRenderer";
import {compareProperty} from "../../../common/util/Comparator";


class ListeMusique extends React.Component {

    constructor(props) {
        super(props);

        this.headers = [
            {name: "",              className: "action",        fixedWidth: 40 },
            {name: "Titre",         className: "titre",             widthPercentage: 27 / 100},
            {name: "Artiste",       className: "artiste",           widthPercentage: 23 / 100},
            {name: "Durée",         className: "duree",         fixedWidth: 60 },
            {name: "BPM",           className: "bpm",           fixedWidth: 60 },
            {name: "Genres",        className: "genre",             widthPercentage: 15 / 100},
            {name: "Class.",        className: "classement",    fixedWidth: 75 },
            {name: "Commentaire",   className: "commentaire",       widthPercentage: 35 / 100}
        ];
        this.sortableColumnsProperties = [ 
            { property : "action",      sortable : false }, 
            { property : "titre",       sortable : true },
            { property : "artiste",     sortable : true },
            { property : "duree",       sortable : true },
            { property : "bpm",         sortable : true },
            { property : "genre",       sortable : false },
            { property : "classement",  sortable : true },
            { property : "commentaire", sortable : false }
        ];

        this.state = {
            searchText: '',
            musiqueRenderers: this._mapMusiqueRenderer(this.props.musiques, {
                onPropertyChange: this._onPropertyChange.bind(this),
                onPlaylistAdd: props.playlistActions.addMusiqueToPlaylist
            }, this.props.genres),
            sortProperties : {
                order : "ASC",
                property : "titre"
            }
        };

        this._sortProperty = this._sortProperty.bind(this);
    }

    render() {
        let filteredMusiqueRenderers = [];
        if (this.state.musiqueRenderers) {
            filteredMusiqueRenderers = this._getFilteredMusiques();
        }

        return (
            <section id="listeMusiques">
                <section id="searchMusique">
                    <FontIcon className="material-icons">search</FontIcon>
                    <TextField className="textField" name={"search"} placeholder={"Recherche"}
                               onKeyPress={e => {
                                   if (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__) {
                                       this._searchMusique(e.target.value);
                                   }
                               }}
                    />
                </section>
                <VirtualizeTable headers={this.headers}
                                 data={filteredMusiqueRenderers}
                                 sortableColumnsProperties={this.sortableColumnsProperties}
                                 sortedColumn={1}
                                 onSortDatas={ (property, order) => this._sortProperty(property, order) }
                />
            </section>
        );
    }

    _mapMusiqueRenderer = (musiques, {onPropertyChange, onPlaylistAdd}, genres) => {
        return musiques.map((musique, index) => {
            return new MusiqueRenderer(musique, index, {onPropertyChange, onPlaylistAdd}, genres)
        });
    };

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

}

ListeMusique.propTypes = {
    musiques: PropTypes.arrayOf(musiquePropType).isRequired
};

export default connect(state => assign({}, {
    musiques: state.musiques,
    genres: state.genres
}), dispatch => ({
    musiquesActions: bindActionCreators(MusiquesActions, dispatch),
    playlistActions: bindActionCreators(PlaylistActions, dispatch)
}))(ListeMusique);
