import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {assign} from "lodash";

import {musiquePropType} from "../../../common/types/MusiqueType";
import MusiquesActions from "../actions/MusiquesActions";
import PlaylistActions from "../../../common/actions/PlaylistActions";

import '../../../../style/components/listeMusiques.css';
import {MusiqueRenderer} from "../../../common/renderer/MusiqueRenderer";
import {genrePropType} from "../../../common/types/GenreType";
import TableMusique from "../../../common/components/musiqueTable/TableMusique";

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
            musiqueRenderers: this._mapMusiqueRenderer(this.props.musiques, {
                onPropertyChange: this._onPropertyChange.bind(this),
                onPlaylistAdd: props.playlistActions.addMusiqueToPlaylist
            }, this.props.genres)
        };

    }

    render() {
        return (
            <TableMusique musiqueRenderers={ this.state.musiqueRenderers }
                          headers={ this.headers }
                          sortableColumnsProperties={ this.sortableColumnsProperties } />
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

}

ListeMusique.propTypes = {
    musiques: PropTypes.arrayOf(musiquePropType).isRequired,
    genres: PropTypes.arrayOf(genrePropType).isRequired
};

export default connect(state => assign({}, {
    musiques: state.musiques,
    genres: state.genres
}), dispatch => ({
    musiquesActions: bindActionCreators(MusiquesActions, dispatch),
    playlistActions: bindActionCreators(PlaylistActions, dispatch)
}))(ListeMusique);
