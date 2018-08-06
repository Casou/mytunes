import React from 'react';
import PropTypes from 'prop-types';
import {Select, MenuItem, Checkbox} from "@material-ui/core";
import cn from "classnames";

import {genrePropType} from "../../types/GenreType";

class SelectGenres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGenreIds: props.selectedGenreIds,
            open : false
        };

        this._onSelectChange = this._onSelectChange.bind(this);
        this._onSelectClose = this._onSelectClose.bind(this);
        this._onSelectOpen = this._onSelectOpen.bind(this);
        this._renderSelectItems = this._renderSelectItems.bind(this);
        this._renderSelectInput = this._renderSelectInput.bind(this);
    }

    render() {
        const {selectedGenreIds, open} = this.state;

        return (
            <Select
                open={open}
                classes={{
                    root : "selectGenres",
                    select: "selectGenres_select",
                    selectMenu: "selectGenres_selectMenu",
                    icon : "selectGenres_icon"
                }}
                MenuProps={{
                    classes : { paper : "selectGenres_popover" }
                }}
                renderValue={this._renderSelectInput}
                multiple={true}
                value={selectedGenreIds}
                onChange={this._onSelectChange}
                onClose={this._onSelectClose}
                onOpen={this._onSelectOpen}
                disabled={this.props.isFetching}
            >
                {this._renderSelectItems()}
            </Select>);
    }

    _renderSelectItems(values, isDisabled) {
        const { genres } = this.props;
        const { selectedGenreIds } = this.state;

        return !genres ? "" :
            genres.map((genre) => {
                const checked = selectedGenreIds && selectedGenreIds.indexOf(genre.id) > -1;
                return (
                    <MenuItem
                        classes={ {
                            root : cn("selectGenres_popover_item", {"disabled": isDisabled}),
                            selected : "checked"
                        }}
                        key={"genre_" + genre.id}
                        checked={checked}
                        value={genre.id}
                    >
                        <Checkbox checked={checked}
                                  classes={{ root : "selectGenres_popover_item_checkbox"}}
                        />
                        <span className={"selectGenres_popover_item_label"}>
                        {genre.label}
                        </span>
                    </MenuItem>
                )
            });
    }

    _renderSelectInput(genreIds) {
        return genreIds.map(idGenre => this.props.genres.filter(genre => genre.id === idGenre)[0].label).join(", ");
    }

    _onSelectChange(event) {
        this.setState({
            ...this.state,
            selectedGenreIds: event.target.value
        });
    }

    _onSelectClose = () => {
        this.setState({ ...this.state, open: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.selectedGenreIds);
        }
    };

    _onSelectOpen = () => {
        this.setState({ ...this.state, open: true });
    };
}

SelectGenres.propTypes = {
    genres: PropTypes.arrayOf(genrePropType).isRequired,
    selectedGenreIds: PropTypes.array.isRequired,
    isFetching: PropTypes.bool,
    onChange: PropTypes.func
};

export default SelectGenres;