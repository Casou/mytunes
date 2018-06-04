import React from 'react';
import PropTypes from 'prop-types';
import { FontIcon } from "material-ui";
import SortableTree from 'react-sortable-tree';
import TreeNodeRenderer from "../renderers/TreeNodeRenderer";
import {playlistPropType} from "../../../common/types/PlaylistType";
import ScrollHandledComponent from "../../../common/components/scrollHandledComponent/ScrollHandledComponent";

class SavedPlaylistsTree extends ScrollHandledComponent {
    constructor(props) {
        super(props, "#savedPlaylistTree .ReactVirtualized__Grid");
        this.idPlaylistToDelete = null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedPlaylist !== nextProps.selectedPlaylist) {
            // TODO Scroll to the selected playlist
            // this.scrollTo({ left : 0, top : 200 });
        }
    }

    render() {
        return (
            <div className={"savedPlaylistSortableTree"}>
                <SortableTree
                    key={this.props.selectedPlaylist ? "savedPlaylistsTree_" + this.props.selectedPlaylist.id + "_" + this.props.playlistProvider.key : "savedPlaylistsTree_key"}
                    treeData={this.props.treeData}
                    rowHeight={40}
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
                                onClick={(e) => this.props.onDeletePlaylist(rowInfo, e)}
                            >
                                <FontIcon className="material-icons">delete</FontIcon>
                            </button>,
                        ],
                    })}
                    onChange={ this.props.onSortedTree }
                    searchQuery={ this.props.selectedPlaylist && this.props.selectedPlaylist.id }
                    searchMethod={({ node, path, treeIndex, searchQuery }) => searchQuery && node.id === searchQuery }
                    // searchFinishCallback={ matches => console.log(matches) }
                />
            </div>
        );
    }
}

SavedPlaylistsTree.propTypes = {
    treeData : PropTypes.array.isRequired,
    selectedPlaylist: playlistPropType,
    playlistProvider : PropTypes.object.isRequired,
    onSelectPlaylist : PropTypes.func.isRequired,
    onDeletePlaylist : PropTypes.func.isRequired,
    onSortedTree : PropTypes.func.isRequired
};

export default SavedPlaylistsTree;