import React from "react";
import {connect} from "react-redux";
import {assign} from "lodash";
import {RaisedButton} from "material-ui";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import '../../../../style/components/listeGenres.css';
import {musiquePropType} from "../../../common/types/MusiqueType";
import {genrePropType} from "../../../common/types/GenreType";
import TableMusique from "../../../common/components/musiqueTable/TableMusique";

class ListeGenres extends React.Component {

    render() {
        const { genreId } = this.props.match.params;
        const genre = genreId ? this.props.genres.filter(genre => genre.id === parseInt(genreId, 10))[0] : null;

        const headers = [
            {name: "",              className: "action",        fixedWidth: 40 },
            {name: "Titre",         className: "titre",             widthPercentage: 27 / 100},
            {name: "Artiste",       className: "artiste",           widthPercentage: 23 / 100},
            {name: "Durée",         className: "duree",         fixedWidth: 60 },
            {name: "BPM",           className: "bpm",           fixedWidth: 60 },
            {name: "Genres",        className: "genre",             widthPercentage: 15 / 100},
            {name: "Class.",        className: "classement",    fixedWidth: 75 },
            {name: "Commentaire",   className: "commentaire",       widthPercentage: 35 / 100}
        ];

        const sortableColumnsProperties = [
            { property : "action",      sortable : false },
            { property : "titre",       sortable : true },
            { property : "artiste",     sortable : true },
            { property : "duree",       sortable : true },
            { property : "bpm",         sortable : true },
            { property : "genre",       sortable : false },
            { property : "classement",  sortable : true },
            { property : "commentaire", sortable : false }
        ];

        return (
            <section id={"listeGenres"}>
            {
                !genre ?
                    <div id={"chooseGenre"}>
                        { this.props.genres.map(genre => (
                            <Link to={ '/genres/' + genre.id } key={'genre_' + genre.id} >
                                <RaisedButton className={"genre_card"}
                                              label={genre.label}
                                              style={ { height : 75 } }
                                />
                            </Link>
                        ))}
                    </div>
                :
                    <div id={"musiqueGenres"}>
                        <header>
                            <h1><Link to={ '/genres' }>{ genre.label }</Link></h1>
                        </header>
                        <TableMusique musiques={ this.props.musiques.filter(musique => musique.genreIds.includes(parseInt(genreId, 10)) ) }
                                      headers={ headers }
                                      sortableColumnsProperties={ sortableColumnsProperties } />
                    </div>
            }
            </section>
        );
    }
}

ListeGenres.propTypes = {
    musiques: PropTypes.arrayOf(musiquePropType).isRequired,
    genres: PropTypes.arrayOf(genrePropType).isRequired
};


export default connect(state => assign({}, {
    musiques: state.musiques,
    genres: state.genres
}), null)(ListeGenres);
