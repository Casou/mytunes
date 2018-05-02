import React from "react";
import { TextField } from "material-ui";
import PropTypes from "prop-types";
import classNames from "classnames";
import {__KEYCODE_ENTER__} from "../../../../App";

const ListeMusiqueTextProperty = (props) => {
  const _onKeyPress = (event) => {
    if (props.onlyNumbers && (event.charCode < 48 || event.charCode > 57)) {
      event.preventDefault();
    }
    if (event.charCode === __KEYCODE_ENTER__) {
      event.preventDefault();
      props.onChange(event);
    }
  };
  
  return (
    <TextField
      id = { "input_" + props.uniqueKey }
      className={ classNames("textField", props.isFetching ? "fetching" : "") } fullWidth={ true } underlineShow={ false }
      name={ props.inputName }
      disabled={ props.isFetching }
      defaultValue={ props.defaultValue }
      onKeyPress={ _onKeyPress }
      onBlur={ props.onChange }
    />
  );
};

ListeMusiqueTextProperty.propTypes = {
  uniqueKey : PropTypes.string.isRequired,
  defaultValue : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  inputName : PropTypes.string,
  isFetching : PropTypes.bool,
  onChange : PropTypes.func,
  onlyNumbers : PropTypes.bool
};

export default ListeMusiqueTextProperty;