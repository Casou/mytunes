import React from "react";
import {connect} from "react-redux";
import {assign} from "lodash";
import {RaisedButton} from "material-ui";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import '../../../../style/components/listeGenres.css';
import {musiquePropType} from "../../../common/types/Musique";
import {genrePropType} from "../../../common/types/Genre";

class ListeGenres extends React.Component {

    render() {
        const { genreId } = this.props.match.params;
        const genre = genreId ? this.props.genres.filter(genre => genre.id === parseInt(genreId))[0] : null;

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
                    genre.label
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
