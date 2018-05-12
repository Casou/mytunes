import React from 'react';
import PropTypes from "prop-types";
import {FontIcon, TextField} from "material-ui";
import VirtualizeTable from "../../../common/components/virtualizeTable/VirtualizeTable";

import {__KEYCODE_ENTER__} from "../../../../App";

import '../../../../style/components/listeMusiques.css';
import {compareProperty} from "../../../common/util/Comparators";
import {formateDuree} from "../../../common/util/Formatters";
import StateBar from "../../../common/components/stateBar/StateBar";
import {musiqueRendererPropType} from "../../types/MusiqueRendererType";

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Object.defineProperty(Array.prototype, "sum", {
    value: function() {
        return this.reduce(function(sum, item) { return sum + item; }, 0);
    }
});

class TableMusique extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            sortProperties : {
                order : "ASC",
                property : "titre"
            }
        };

        this._sortProperty = this._sortProperty.bind(this);
        this._searchMusique = this._searchMusique.bind(this);
    }

    render() {
        let filteredMusiqueRenderers = [];
        if (this.props.musiqueRenderers) {
            filteredMusiqueRenderers = this._getFilteredMusiques();
        }

        return (
            <section id="listeMusiques">
                <section id="searchMusique">
                    <FontIcon className="material-icons">search</FontIcon>
                    <TextField className="textField" name={"search"} placeholder={"Recherche"}
                               onKeyPress={e => {
                                   if (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__) {
                                       this._searchMusique(e.target.value);
                                   }
                               }}
                    />
                </section>
                <VirtualizeTable headers={this.props.headers}
                                 data={filteredMusiqueRenderers}
                                 sortableColumnsProperties={this.props.sortableColumnsProperties}
                                 sortedColumn={1}
                                 onSortDatas={ (property, order) => this._sortProperty(property, order) }
                />
                <StateBar>
                    { filteredMusiqueRenderers.length } musique{ filteredMusiqueRenderers.length > 1 ? "s" : "" }
                    &nbsp;-&nbsp;Durée totale : { formateDuree(filteredMusiqueRenderers.map(musiqueRenderer => musiqueRenderer.musique.duree).sum()) }
                </StateBar>
            </section>
        );
    }

    _getFilteredMusiques() {
        const {searchText, sortProperties} = this.state;
        const {musiqueRenderers} = this.props;
        let filteredMusiques = [...musiqueRenderers];

        if (searchText) {
            filteredMusiques = filteredMusiques.filter(musiqueRenderer => musiqueRenderer.musique.searchText.indexOf(searchText.toLowerCase()) >= 0);
        }

        if (sortProperties) {
            filteredMusiques = filteredMusiques.sort((a, b) => {
                return compareProperty(a.musique, b.musique, sortProperties.property, sortProperties.order);
            });
        }

        return filteredMusiques;
    }

    _searchMusique(text) {
        this.setState({
            ...this.state,
            searchText: text
        });
    }

    _sortProperty(property, order) {
        this.setState({
            ...this.state,
            sortProperties : {
                order,
                property
            }
        });
    }

}

TableMusique.propTypes = {
    musiqueRenderers: PropTypes.arrayOf(musiqueRendererPropType).isRequired,
    headers: PropTypes.array.isRequired,
    sortableColumnsProperties: PropTypes.array.isRequired
};

export default TableMusique;
