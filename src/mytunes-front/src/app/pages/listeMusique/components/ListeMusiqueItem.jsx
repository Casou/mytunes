import React from 'react';
import PropTypes from "prop-types";
import { musiquePropType } from "../../../common/types/Musique";
import Classement from "./Classement";
import {FontIcon, IconButton, TextField} from "material-ui";
import { isEqual } from "lodash";
import {bindActionCreators} from "redux";
import MusiquesActions from "../actions/MusiquesActions";
import {connect} from "react-redux";
import {__KEYCODE_ENTER__} from "../../../../App";

class ListeMusiqueItem extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      musique: this.props.musique
    }
  }
  
  formate10 = number => {
    return number >= 10 ? number : "0" + number;
  };
  
  formateDuree = duree => {
    const sec_num = parseInt(duree / 1000, 10);
    const hours   = Math.floor(sec_num / 3600) % 24;
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;
    return ((hours > 0) ? this.formate10(hours) + ":" : "")
      + this.formate10(minutes) + ":"
      + this.formate10(seconds);
  };
  
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.musique, nextProps.musique)) {
      this.setState({
        ...this.state,
        musique : nextProps.musique
      });
    }
  }
  
  render() {
    const { addMusiqueToPlaylist, updateProperty } = this.props;
    const { musique } = this.state;
    
    return (
      <tr className={ musique.isHidden ? "hidden" : "" }>
        <td className={ "action" }>
          <IconButton onClick={ () => addMusiqueToPlaylist(musique) }>
            <FontIcon className="material-icons">playlist_add</FontIcon>
          </IconButton>
        </td>
        <td className={ "titre" }>

          <TextField
            className="textField" fullWidth={ true } underlineShow={ false }
            onBlur={ e => this.onPropertyChange("titre", e.target.value) }
            onKeyPress={ e => {
              if (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__) {
                this.onPropertyChange("titre", e.target.value)
              }
            } }
            name={"titre"}
            defaultValue={ musique.titre }
          />
        </td>
        <td className={ "artiste" }>
          <TextField
            className="textField" fullWidth={true} underlineShow={ false } onBlur={ () => updateProperty(musique) }
            name={"artiste"}
            defaultValue={ musique.artiste ? musique.artiste : "" }
            onChange={ (e) => this.onPropertyChange("artiste", e.target.value) }
          />
        </td>
        <td className={ "duree" }>{ this.formateDuree(musique.duree) }</td>
        <td className={ "bpm" }>
          <TextField
            className="textField" fullWidth={true} underlineShow={ false } onBlur={ () => updateProperty(musique) }
            name={"bpm"}
            defaultValue={ musique.bpm ? musique.bpm / 4 : "" }
            onChange={ (e) => this.onPropertyChange("bpm", e.target.value) }
          />
        </td>
        <td className={ "genre" }>
          <TextField
            className="textField" fullWidth={true} underlineShow={ false } onBlur={ () => updateProperty(musique) }
            name={"genre"}
            defaultValue={ musique.genre ? musique.genre : "" }
            onChange={ (e) => this.onPropertyChange("genre", e.target.value) }
          />
        </td>
        <td className={ "classement" }>
          <Classement key={ "classement_" + musique.itunesId }
                      musique={ musique }
                      onChange={ (value) => this.onPropertyChange("classement", value) }/>
        </td>
        <td className={ "commentaire" }>
          <TextField
            className="textField" fullWidth={true} underlineShow={ false } onBlur={ () => updateProperty(musique) }
            name={"commentaire"}
            defaultValue={ musique.commentaire ? musique.commentaire : "" }
            onChange={ (e) => this.onPropertyChange("commentaire", e.target.value) }
          />
        </td>
      </tr>
    )
  }
  
  onPropertyChange(property, newValue) {
    const { musique } = this.state;
    
    // Grey
    this.setState({
      ...this.state,
      musique: {
        ...musique,
        isFetching: {
          ...musique.isFetching,
          [property]: true
        }
      }
    }, () => {
      this.props.musiquesActions.updateMusique(musique, property, newValue)
      .then(()=> {
        this.setState({
          ...this.state,
          musique: {
            ...musique,
            [property]: newValue,
            isFetching: {
              ...musique.isFetching,
              [property]: false
            }
          }
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          musique: {
            ...musique,
            isFetching: {
              ...musique.isFetching,
              [property]: false
            }
          }
        });
      });
    });
  }
}

ListeMusiqueItem.propTypes = {
  musique : musiquePropType.isRequired,
  addMusiqueToPlaylist : PropTypes.func.isRequired,
  updateRating : PropTypes.func.isRequired,
  updateProperty : PropTypes.func.isRequired
};

export default connect(null,
  dispatch => ({
    musiquesActions: bindActionCreators(MusiquesActions, dispatch)
  }))(ListeMusiqueItem);
