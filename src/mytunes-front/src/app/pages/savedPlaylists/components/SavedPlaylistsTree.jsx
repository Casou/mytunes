import React from 'react';
import PropTypes from 'prop-types';
import { FontIcon, Checkbox } from "material-ui";
import SortableTree from 'react-sortable-tree';

import {playlistPropType} from "../../../common/types/PlaylistType";
import TreeNodeRenderer from "../renderers/TreeNodeRenderer";
import ConfirmDialog from "../../../common/components/confirm/ConfirmDialog";
import AddPlaylistTextField from "./AddPlaylistTextField";

import "../../../../style/components/savedPlaylistsTree.css"
import ScrollHandledComponent from "../../../common/components/scrollHandledComponent/ScrollHandledComponent";

class SavedPlaylistsTree extends ScrollHandledComponent {
    
    constructor(props) {
        super(props, "#savedPlaylistTree > div.rst__tree > div:nth-child(1) > div");

        this._showDeletePlaylistConfirm = this._showDeletePlaylistConfirm.bind(this);
    }

    _showDeletePlaylistConfirm = (rowInfo, e) => {
        e.preventDefault();
        e.stopPropagation();
        this.idPlaylistToDelete = rowInfo.node.id;
        this.confirmDeletePlaylist.handleOpen();
    };

    render() {
        return (
            <div id={"savedPlaylistTree"}>
                <AddPlaylistTextField className={"addPlaylist"} onNewPlaylist={this.props.onNewPlaylist} />
                <SortableTree
                    key={this.props.selectedPlaylist ? "savedPlaylistsTree_" + this.props.selectedPlaylist.id + "_" + this.props.playlistProvider.key : "savedPlaylistsTree_key"}
                    treeData={this.props.treeData}
                    rowHeight={55}
                    maxDepth={4}
                    nodeContentRenderer={(rendererProps) => <TreeNodeRenderer onClick={this.props.onSelectPlaylist}
                                                                              selectedPlaylist={this.props.selectedPlaylist}
                                                                              {...rendererProps} /> }
                    generateNodeProps={rowInfo => ({
                        buttons: [
                            <button
                                style={{
                                    verticalAlign: 'middle',
                                }}
                                onClick={(e) => this._showDeletePlaylistConfirm(rowInfo, e)}
                            >
                                <FontIcon className="material-icons">delete</FontIcon>
                            </button>,
                        ],
                    })}
                    onChange={ this.props.onSortedTree }
                />
                <ConfirmDialog ref={ref => this.confirmDeletePlaylist = ref}
                               className={"confirmDeletePlaylist"}
                               message={
                                   <div>
                                       <p>
                                        Etes-vous sûr de vouloir supprimer cette playlist ?
                                       </p>
                                       <Checkbox
                                           label="Supprimer aussi les enfants"
                                           checked={false}
                                       />
                                   </div>
                               }
                               onConfirm={ () => this.props.onDeletePlaylist(this.idPlaylistToDelete) }
                />
            </div>
        );
    }

}

SavedPlaylistsTree.propTypes = {
    treeData : PropTypes.array.isRequired,
    selectedPlaylist: playlistPropType,
    playlistProvider : PropTypes.object.isRequired,
    onSortedTree : PropTypes.func.isRequired,
    onDeletePlaylist : PropTypes.func.isRequired,
    onSelectPlaylist : PropTypes.func.isRequired,
    onNewPlaylist : PropTypes.func.isRequired
};

export default SavedPlaylistsTree;