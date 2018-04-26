import React from 'react';
import PropTypes from "prop-types";
import { musiquePropType } from "../../../common/types/Musique";
import Classement from "./Classement";
import {SvgIcon, TextField} from "material-ui";
import { isEqual } from "lodash";

export default class ListeMusiqueItem extends React.Component {
  
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
      <tr>
        <td className={ "action" }>
          <span onClick={ () => addMusiqueToPlaylist(musique) }>
            <SvgIcon>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </SvgIcon>
          </span>
        </td>
        <td className={ "titre" }>
          <TextField
            className="textField" fullWidth={true} underlineShow={ false } onBlur={ () => updateProperty(musique) }
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
          <Classement key={ "classement_" + musique.itunesId } musique={ musique } />
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
    musique[property] = newValue;
    this.setState({
      ...this.state,
      musique
    });
  }
  
}

ListeMusiqueItem.propTypes = {
  musique : musiquePropType.isRequired,
  addMusiqueToPlaylist : PropTypes.func.isRequired,
  updateRating : PropTypes.func.isRequired,
  updateProperty : PropTypes.func.isRequired
};
