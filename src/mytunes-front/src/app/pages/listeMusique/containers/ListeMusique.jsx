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


class ListeMusique extends React.Component {

    constructor(props) {
        super(props);

        this.headers = [
            {name: "", className: "action", widthPercentage: 5 / 100},
            {name: "Titre", className: "titre", widthPercentage: 16 / 100},
            {name: "Artiste", className: "artiste", widthPercentage: 15 / 100},
            {name: "Durée", className: "duree", widthPercentage: 7 / 100},
            {name: "BPM", className: "bpm", widthPercentage: 5 / 100},
            {name: "Genres", className: "genre", widthPercentage: 15 / 100},
            {name: "Class.", className: "classement", widthPercentage: 8 / 100},
            {name: "Commentaire", className: "commentaire", widthPercentage: 29 / 100}
        ];

        this.state = {
            searchText: '',
            musiqueRenderers: this._mapMusiqueRenderer(this.props.musiques, {
                onPropertyChange: this._onPropertyChange.bind(this),
                onPlaylistAdd: props.playlistActions.addMusiqueToPlaylist
            })
        };
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
                               onKeyPress={ e => {
                                   if (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__) {
                                       this._searchMusique(e.target.value);
                                   }
                               }}
                    />
                </section>
                <VirtualizeTable headers={ this.headers }
                                 data={ filteredMusiqueRenderers }/>
            </section>
        );
    }

    _mapMusiqueRenderer = (musiques, {onPropertyChange, onPlaylistAdd}) => {
        return musiques.map((musique, index) => {
            return new MusiqueRenderer(musique, index, {onPropertyChange, onPlaylistAdd})
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
        const {musiqueRenderers, searchText} = this.state;

        if (searchText) {
            return musiqueRenderers.filter(musiqueRenderer => musiqueRenderer.musique.searchText.indexOf(searchText.toLowerCase()) >= 0);
        }
        return musiqueRenderers;
    }

    _searchMusique(text) {
        this.setState({
            ...this.state,
            searchText: text
        });
    }
    
}

ListeMusique.propTypes = {
    musiques: PropTypes.arrayOf(musiquePropType).isRequired
};

export default connect(state => assign({}, {
    musiques: state.musiques
}), dispatch => ({
    musiquesActions: bindActionCreators(MusiquesActions, dispatch),
    playlistActions: bindActionCreators(PlaylistActions, dispatch)
}))(ListeMusique);
