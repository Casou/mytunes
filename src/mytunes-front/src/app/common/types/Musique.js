import PropTypes from "prop-types";

export const musiquePropType = PropTypes.shape({
  itunesId: PropTypes.number.isRequired,
  titre: PropTypes.string.isRequired,
  artiste: PropTypes.string,
  duree: PropTypes.number.isRequired,
  bpm: PropTypes.number,
  // genres: PropTypes.array.isRequired,
  genre: PropTypes.string,
  classement: PropTypes.number,
  timerDebut: PropTypes.number,
  timerFin: PropTypes.number,
  commentaire: PropTypes.string,
  path: PropTypes.string.isRequired
});
