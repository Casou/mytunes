import React from "react";
import PropTypes from "prop-types";
import { FlatButton, Dialog } from "material-ui";

class ConfirmDialog extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Annuler"
                primary={false}
                onClick={ () => {
                    if (this.props.onCancel) {
                        this.props.onCancel();
                    }
                    this.handleClose();
                }}
            />,
            <FlatButton
                label="OK"
                primary={true}
                onClick={ () => {
                    if (this.props.onConfirm) {
                        this.props.onConfirm();
                    }
                    this.handleClose();
                }}
            />,
        ];

        return (
            <Dialog
                title={ this.props.title ? this.props.title : "Confirmation" }
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                className={ this.props.className }
            >
                { this.props.message }
            </Dialog>
        );
    }
}

ConfirmDialog.propTypes = {
    title : PropTypes.string,
    message : PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onConfirm : PropTypes.func,
    onCancel : PropTypes.func,
    className : PropTypes.string
};

export default ConfirmDialog;