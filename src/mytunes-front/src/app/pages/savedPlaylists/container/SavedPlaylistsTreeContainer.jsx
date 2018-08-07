import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from "@material-ui/core";

import {playlistPropType} from "../../../common/types/PlaylistType";
import ConfirmDialog from "../../../common/components/confirm/ConfirmDialog";
import AddPlaylistTextField from "../components/AddPlaylistTextField";

import "../../../../style/components/savedPlaylistsTree.css"
import SavedPlaylistsTree from "../components/SavedPlaylistsTree";

class SavedPlaylistsTreeContainer extends React.Component {

    state = {
        confirmCheck : false
    };
    
    constructor(props) {
        super(props);

        this._showDeletePlaylistConfirm = this._showDeletePlaylistConfirm.bind(this);
    }

    _showDeletePlaylistConfirm = (rowInfo, e) => {
        e.preventDefault();
        e.stopPropagation();
        this.idPlaylistToDelete = rowInfo.node.id;

        if (rowInfo.node.children.length) {
            this.confirmDeleteFolder.handleOpen();
        } else {
            this.confirmDeletePlaylist.handleOpen();
        }
    };

    render() {
        return (
            <div id={"savedPlaylistTree"}>
                <AddPlaylistTextField className={"addPlaylist"} onNewPlaylist={this.props.onNewPlaylist} />
                <SavedPlaylistsTree treeData={this.props.treeData}
                                    playlistProvider={ this.props.playlistProvider }
                                    selectedPlaylist={ this.props.selectedPlaylist }
                                    onSelectPlaylist={ this.props.onSelectPlaylist }
                                    onDeletePlaylist={ this._showDeletePlaylistConfirm }
                                    onSortedTree={ this.props.onSortedTree }
                />
                <ConfirmDialog ref={ref => this.confirmDeletePlaylist = ref}
                               className={"confirmDeletePlaylist"}
                               message={
                                   <div>
                                       <p>
                                        Etes-vous sûr de vouloir supprimer cette playlist ?
                                       </p>
                                   </div>
                               }
                               onConfirm={ () => this.props.onDeletePlaylist(this.idPlaylistToDelete, false) }
                />
                <ConfirmDialog ref={ref => this.confirmDeleteFolder = ref}
                               className={"confirmDeletePlaylist"}
                               message={
                                   <div>
                                       <p>
                                        Etes-vous sûr de vouloir supprimer cette playlist ?
                                       </p>
                                       <div className={"checkbox"}>
                                           <Checkbox checked={ this.state.confirmCheck }
                                                     onChange={ (event) => this.setState({...this.state, confirmCheck : event.target.checked}) }
                                           />
                                           Supprimer aussi les enfants
                                       </div>
                                   </div>
                               }
                               onHandleOpen={ () => this.setState({...this.state, confirmCheck : false}) }
                               onConfirm={ () => this.props.onDeletePlaylist(this.idPlaylistToDelete, this.state.confirmCheck) }
                />
            </div>
        );
    }

}

SavedPlaylistsTreeContainer.propTypes = {
    treeData : PropTypes.array.isRequired,
    selectedPlaylist: playlistPropType,
    playlistProvider : PropTypes.object.isRequired,
    onSortedTree : PropTypes.func.isRequired,
    onDeletePlaylist : PropTypes.func.isRequired,
    onSelectPlaylist : PropTypes.func.isRequired,
    onNewPlaylist : PropTypes.func.isRequired
};

export default SavedPlaylistsTreeContainer;