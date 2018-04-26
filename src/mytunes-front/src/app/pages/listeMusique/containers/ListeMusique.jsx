import React from 'react';
import PropTypes from "prop-types";
import ListeMusiqueHeader from "../components/ListeMusiqueHeader";
import ListeMusiqueItem from "../components/ListeMusiqueItem";
import { musiquePropType } from "../../../common/types/Musique";
import { connect } from "react-redux";
import { assign } from "lodash";


// class ListeMusique extends React.Component {
const ListeMusique = (props) => {
  
  const updateRating = (rating, musique) => {
    console.log(musique.titre + " : new rating = " + rating);
    
    // const payload = {
    //   musique: musique,
    //   newClassement: rating
    // };
    // axios.put(__SERVER_URL__ + "/classement", payload);
  
    // this.stompClient.send({
    //     musique: musique,
    //     newClassement: rating
    // });
  };
  
  const updateProperty = (musique) => {
    console.log("updateProperty", musique);
  };
  
  const addMusiqueToPlaylist = (musique) => {
    console.log("addMusiqueToPlaylist " + musique.titre);
  };
  
  return (
    <section className="listeMusiques">
      <table>
        <thead>
        <ListeMusiqueHeader />
        </thead>
        <tbody>
        {
          !props.musiques ? "" :
          props.musiques.map(musique => (
            <ListeMusiqueItem musique={ musique }
                              key={ musique.itunesId }
                              addMusiqueToPlaylist={ addMusiqueToPlaylist }
                              updateRating={ updateRating }
                              updateProperty={ updateProperty }
            />
          ))
        }
        </tbody>
      </table>
    </section>
  );
};

ListeMusique.propTypes = {
  musiques: PropTypes.arrayOf(musiquePropType).isRequired
};

export default connect(state => assign({}, {
  musiques: state.musiques
}), null
//     dispatch => ({
//   globalActions: bindActionCreators(GlobalActions, dispatch)
// })
)(ListeMusique);

// export default ListeMusique;