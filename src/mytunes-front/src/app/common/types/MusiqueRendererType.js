import PropTypes from "prop-types";
import {musiquePropType} from "./MusiqueType";
import {genrePropType} from "./GenreType";

export const musiqueRendererPropType = PropTypes.shape({
    genres : PropTypes.arrayOf(genrePropType).isRequired,
    index : PropTypes.number.isRequired,
    musique : PropTypes.shape({type: PropTypes.oneOf([musiquePropType])}).isRequired,
    onPropertyChange : PropTypes.func.isRequired,
    onPlaylistAdd : PropTypes.func.isRequired,
    renderCell : PropTypes.func.isRequired
});
