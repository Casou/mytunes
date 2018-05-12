import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {assign} from "lodash";

import {musiquePropType} from "../../../common/types/MusiqueType";
import TableMusique from "../../../common/components/musiqueTable/TableMusique";

const ListeMusique = (props) => {

    const headers = [
        {name: "",              className: "action",        fixedWidth: 40 },
        {name: "Titre",         className: "titre",             widthPercentage: 27 / 100},
        {name: "Artiste",       className: "artiste",           widthPercentage: 23 / 100},
        {name: "Durée",         className: "duree",         fixedWidth: 60 },
        {name: "BPM",           className: "bpm",           fixedWidth: 60 },
        {name: "Genres",        className: "genre",             widthPercentage: 15 / 100},
        {name: "Class.",        className: "classement",    fixedWidth: 75 },
        {name: "Commentaire",   className: "commentaire",       widthPercentage: 35 / 100}
    ];

    const sortableColumnsProperties = [
        { property : "action",      sortable : false },
        { property : "titre",       sortable : true },
        { property : "artiste",     sortable : true },
        { property : "duree",       sortable : true },
        { property : "bpm",         sortable : true },
        { property : "genre",       sortable : false },
        { property : "classement",  sortable : true },
        { property : "commentaire", sortable : false }
    ];

    return (
        <TableMusique musiques={ props.musiques }
                      headers={ headers }
                      sortableColumnsProperties={ sortableColumnsProperties } />
    );

}

ListeMusique.propTypes = {
    musiques: PropTypes.arrayOf(musiquePropType).isRequired
};

export default connect(state => assign({}, {
    musiques: state.musiques
}), null)(ListeMusique);
