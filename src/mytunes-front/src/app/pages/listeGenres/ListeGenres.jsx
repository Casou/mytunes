import React from "react";
import {connect} from "react-redux";
import {assign} from "lodash";
import {RaisedButton} from "material-ui";

import '../../../style/components/listeGenres.css';

const ListeGenres = (props) => {

    return (
        <section id={"listeGenres"}>
            {props.genres.map(genre => (
                <RaisedButton key={'ripple_card_' + genre.id}
                              className={"genre_card"}
                              label={genre.label}
                              style={ { height : 75 } }
                />
            ))}
        </section>
    );
};

export default connect(state => assign({}, {
    musiques: state.musiques,
    genres: state.genres
}), null)(ListeGenres);
