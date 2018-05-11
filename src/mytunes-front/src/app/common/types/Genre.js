import PropTypes from "prop-types";

export const genrePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
});
