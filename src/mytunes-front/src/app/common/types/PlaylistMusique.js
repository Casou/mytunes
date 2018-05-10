import PropTypes from "prop-types";
import {musiquePropType} from "./Musique";

const playlistMusiquePropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    itunesId: PropTypes.number,
    titre: PropTypes.string.isRequired,
    // artiste: PropTypes.string,
    duree: PropTypes.number.isRequired,
    // bpm: PropTypes.number,
    // genres: PropTypes.array.isRequired,
    // genre: PropTypes.string,
    // classement: PropTypes.number,
    timerDebut: PropTypes.number,
    timerFin: PropTypes.number,
    // commentaire: PropTypes.string,
    path: PropTypes.string.isRequired,
    alreadyPlayed: PropTypes.bool.isRequired
});

export const playlistManagerPropType = PropTypes.shape({
    musiquePlaying: musiquePropType,
    musiques: PropTypes.arrayOf(playlistMusiquePropType).isRequired
});
