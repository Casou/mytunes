import PropTypes from "prop-types";

export const playlistPropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    itunesId: PropTypes.number,
    nom: PropTypes.string.isRequired,
    isFolder: PropTypes.bool.isRequired,
    id_playlist_parent: PropTypes.number,
    musiqueIds: PropTypes.arrayOf(PropTypes.number),
    childrenIds: PropTypes.arrayOf(PropTypes.number),
    musiquesOrderIds: PropTypes.arrayOf(PropTypes.number)
});
