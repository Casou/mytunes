import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from "@material-ui/core";
import {__KEYCODE_ENTER__} from "../../../../App";

class ControlledTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.searchInput = null;
        this._onKeyPress = this._onKeyPress.bind(this);
    }

    componentDidMount() {
        const {events} = this.props;
        this.searchInput.addEventListener("keypress", this._onKeyPress);
        if (events) {
            Object.keys(events).forEach(eventName =>
                this.searchInput.addEventListener(eventName, events[eventName]));
        }
    }

    render() {
        const { name, defaultValue, classes, placeholder, onEnter, onKeyPress, events, ...otherProps } = this.props;

        return (
            <TextField {...otherProps}
                       classes={ classes }
                       defaultValue={defaultValue}
                       name={name}
                       placeholder={placeholder}
                       inputRef={ instance => this.searchInput = instance }
            />);
    }

    _onKeyPress(e) {
        const {onEnter, onKeyPress, events, blurOnEnter} = this.props;

        if (onEnter && (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__)) {
            if (!blurOnEnter && (!events || !events["blur"])) {
                onEnter(e.target.value);
            }
            if (blurOnEnter) {
                this.searchInput.blur();
            }
        } else if (onKeyPress) {
            onKeyPress(e);
        }
    }
}

ControlledTextField.propTypes = {
    name : PropTypes.string,
    placeholder : PropTypes.string,
    defaultValue : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    classes : PropTypes.object,
    onEnter : PropTypes.func,
    blurOnEnter : PropTypes.bool,
    onKeyPress : PropTypes.func,
    events : PropTypes.instanceOf(Map)
};

ControlledTextField.defaultProps = {
    blurOnEnter : true
};

export default ControlledTextField;