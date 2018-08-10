import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ControlledTextField from "../../../common/components/input/ControlledTextField";

const ListeMusiqueTextProperty = (props) => {
    const _onKeyPress = (event) => {
        if (props.onlyNumbers && (event.charCode < 48 || event.charCode > 57)) {
            event.preventDefault();
        }
    };

    const events = new Map();
    events["blur"] = (e) => props.onChange(e.target.value);

    return (
        <ControlledTextField
            id={"input_" + props.uniqueKey}
            classes={{ root : classNames("textField", { "fetching" : props.isFetching } )}}
            name={props.inputName}
            onEnter={props.onChange}
            onKeyPress={_onKeyPress}
            defaultValue={props.defaultValue}
            fullWidth={true}
            disabled={props.isFetching}
            events={events}
        />
    );
};

ListeMusiqueTextProperty.propTypes = {
    uniqueKey: PropTypes.string.isRequired,
    inputName: PropTypes.string,
    isFetching: PropTypes.bool,
    onChange: PropTypes.func,
    onlyNumbers: PropTypes.bool
};

export default ListeMusiqueTextProperty;