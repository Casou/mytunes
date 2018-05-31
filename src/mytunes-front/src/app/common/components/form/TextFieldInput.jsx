import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import {__KEYCODE_ENTER__} from "../../../../App";
import classnames from 'classnames';

class TextFieldInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : props.value ? props.value : ""
        };
        this.inputRef = null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({...this.state, value : nextProps.value});
        }
    }

    render() {
        const { classNames, name, placeholder, onChange, changeOnEnter } = this.props;
        const { value } = this.state;

        return (
            <TextField ref={instance => this.inputRef = instance }
                       className={classnames("textField", classNames)}
                       name={name}
                       placeholder={placeholder}
                       value={ value }
                       onChange={ (event) => {
                           this.setState({...this.state, value : event.target.value});
                           if (!changeOnEnter) {
                               onChange(event.target.value);
                           }
                       } }
                       onBlur={() => onChange(value)}
                       onKeyPress={e => {
                           if (changeOnEnter && (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__)) {
                               this.inputRef.blur();
                           }
                       }}
            />);
    }
}

TextFieldInput.propTypes = {
    value : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onChange : PropTypes.func.isRequired,
    classNames : PropTypes.oneOf([PropTypes.string, PropTypes.array]),
    changeOnEnter : PropTypes.bool.isRequired,
    name : PropTypes.string.isRequired,
    placeholder : PropTypes.string
};

export default TextFieldInput;