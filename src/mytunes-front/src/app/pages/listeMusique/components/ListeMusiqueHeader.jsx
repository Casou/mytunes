import React from 'react';
import {Checkbox, TextField} from "material-ui";
import PropTypes from "prop-types";
import {__KEYCODE_ENTER__} from "../../../../App";

const ListeMusiqueHeader = (props) => (
  <thead>
      <tr id={"searchBar"}>
        <th className={"action"}></th>
        <th className={"titre"}></th>
        <th className={"artiste"}></th>
        <th className={"duree"}></th>
        <th className={"bpm"}></th>
        <th className={"genre"}></th>
        <th className={"classement"}></th>
        <th className={"commentaire"}>
          <svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          <TextField className="textField" name={"search"} placeholder={"Recherche"}
                     onKeyPress={ e => {
                       if (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__) {
                         props.onSearch(e.target.value);
                       }
                     }}
           />
        </th>
      </tr>
      <tr>
        <th className={"action"}></th>
        <th className={"titre"}>Titre</th>
        <th className={"artiste"}>Artiste</th>
        <th className={"duree"}>Durée</th>
        <th className={"bpm"}>BPM</th>
        <th className={"genre"}>Genre</th>
        <th className={"classement"}>Classement</th>
        <th className={"commentaire"}>Commentaire</th>
      </tr>
  </thead>
);

ListeMusiqueHeader.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default ListeMusiqueHeader;