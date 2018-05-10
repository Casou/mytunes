import PropTypes from "prop-types";

export const musiquePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  itunesId: PropTypes.number,
  titre: PropTypes.string.isRequired,
  artiste: PropTypes.string,
  duree: PropTypes.number.isRequired,
  bpm: PropTypes.number,
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  // genre: PropTypes.string,
  classement: PropTypes.number,
  timerDebut: PropTypes.number,
  timerFin: PropTypes.number,
  commentaire: PropTypes.string,
  path: PropTypes.string.isRequired
});
