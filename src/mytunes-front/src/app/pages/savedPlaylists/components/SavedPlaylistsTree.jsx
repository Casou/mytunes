import React from 'react';
import PropTypes from 'prop-types';

const SavedPlaylistsTree = (props) => {
    return (<div>
        <SortableTree
            key={selectedPlaylist ? "savedPlaylistsTree_" + selectedPlaylist.id + "_" + playlistProvider.key : "savedPlaylistsTree_key"}
            treeData={treeData}
            rowHeight={55}
            maxDepth={4}
            nodeContentRenderer={(props) => <TreeNodeRenderer onClick={this._selectPlaylist}
                                                              selectedPlaylist={selectedPlaylist}
                                                              {...props} /> }
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
            onChange={ this._sortedTree }
        />
        <ConfirmDialog ref={ref => this.confirmDeletePlaylist = ref}
                       message={"Etes-vous sûr de vouloir supprimer cette playlist ?"}
                       onConfirm={ this._deletePlaylist }
        />
    </div>);
}

SavedPlaylistsTree.propTypes = {};

export default SavedPlaylistsTree;