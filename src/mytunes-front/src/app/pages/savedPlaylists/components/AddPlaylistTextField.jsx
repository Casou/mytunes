import React from 'react';
import PropTypes from 'prop-types';
import TextFieldInput from "../../../common/components/form/TextFieldInput";
import { RaisedButton } from "material-ui";

class AddPlaylistTextField extends React.Component {
    state = {
        newPlaylistName : null
    };

    render() {
        const { newPlaylistName } = this.state;
        return (
        <div className={ this.props.className }>
            <TextFieldInput onChange={ (value) => this.setState({...this.state, newPlaylistName : value }) }
                            value={ newPlaylistName }
                            changeOnEnter={false}
                            name={"newPlaylistName"}
                            placeholder={"Nouvelle playlist"} />
            <RaisedButton label="Ajouter"
                          className={"newPlaylistButton"}
                          onClick={ () => this.props.onNewPlaylist(newPlaylistName).then(() =>
                              this.setState({...this.state, newPlaylistName : "" })
                          ) }
                          primary={!!this.state.newPlaylistName}
            />
        </div>);
    }
}

AddPlaylistTextField.propTypes = {
    onNewPlaylist: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default AddPlaylistTextField;