import React from 'react';
import PropTypes from 'prop-types';
import {SelectField, MenuItem} from "material-ui";
import cn from "classnames";

import {genrePropType} from "../../types/GenreType";

class SelectGenres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGenreIds: props.selectedGenreIds
        };

        this._onSelectChange = this._onSelectChange.bind(this);
        this._onSelectClose = this._onSelectClose.bind(this);
        this._renderSelectItems = this._renderSelectItems.bind(this);
    }

    render() {
        const { selectedGenreIds } = this.state;
        return (
         <SelectField
            multiple={true}
            value={selectedGenreIds}
            onChange={ this._onSelectChange }
            dropDownMenuProps={{
                onClose: this._onSelectClose
            }}
            disabled={this.props.isFetching}
        >
            { this._renderSelectItems() }
        </SelectField>);
    }

    _renderSelectItems(values, isDisabled) {
        return !this.props.genres ? "" :
            this.props.genres.map((genre) => {
                const checked = this.props.selectedGenreIds && this.props.selectedGenreIds.indexOf(genre.id) > -1;
                return (
                    <MenuItem
                        className={cn({"disabled": isDisabled}, {"checked": checked})}
                        key={"genre_" + genre.id}
                        insetChildren={true}
                        checked={checked}
                        value={genre.id}
                        primaryText={genre.label}
                    />
                )
            });
    }

    _onSelectChange(e, key, payload) {
        this.setState({
            ...this.state,
            selectedGenreIds : payload
        });
    }

    _onSelectClose() {
        if (this.props.onChange) {
            this.props.onChange(this.state.selectedGenreIds);
        }
    }
}

SelectGenres.propTypes = {
    genres: PropTypes.arrayOf(genrePropType).isRequired,
    selectedGenreIds: PropTypes.array.isRequired,
    isFetching : PropTypes.bool,
    onChange : PropTypes.func
};

export default SelectGenres;