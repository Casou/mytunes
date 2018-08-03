import React from 'react';
import PropTypes from 'prop-types';
import { AlertDialog, Button } from 'react-onsenui';

import '../style/ConfirmDialog.css';

class ConfirmDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            callerObject : null
        };
    }

    _handleCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.closeDialog();
    }

    closeDialog() {
        this.setState({ ...this.state, isOpen : false, callerObject : null });
    }

    openDialog(object) {
        this.setState({ ...this.state, isOpen : true, callerObject : object });
    }

    render() {
        return (
                <AlertDialog className={"mobile_confirmDialog"}
                         isOpen={this.state.isOpen}
                         onCancel={this._handleCancel.bind(this)}
                         cancelable>
                <div className="alert-dialog-title">{ this.props.title }</div>
                <div className="alert-dialog-content">
                    { this.props.message }
                </div>
                <div className="alert-dialog-footer">
                    <Button onClick={this._handleCancel.bind(this)} className="alert-dialog-button alert-dialog-button-cancel">
                        Annuler
                    </Button>
                    <Button onClick={this.props.onConfirm} className="alert-dialog-button alert-dialog-button-ok">
                        OK
                    </Button>
                </div>
            </AlertDialog>
        );
    }
}

ConfirmDialog.propTypes = {
    title : PropTypes.string,
    message : PropTypes.string.isRequired,
    onConfirm : PropTypes.func.isRequired,
    onCancel : PropTypes.func
};

ConfirmDialog.defaultProps = {
    title : "Confirmation"
};

export default ConfirmDialog;