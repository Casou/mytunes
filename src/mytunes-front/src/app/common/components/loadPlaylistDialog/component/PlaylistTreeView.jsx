import React from 'react';
import PropTypes from 'prop-types';
import {Treebeard, decorators} from 'react-treebeard';
import {FontIcon} from "material-ui";
import cn from "classnames";
import {playlistPropType} from "../../../types/PlaylistType";

decorators.Header = ({style, node}) => {
    const iconType = node.children ? 'folder' : 'insert_drive_file';

    return (
        <div className={cn("tree-node",
            [
                { "tree-folder" : node.children },
                { "tree-item" : !node.children },
                { "active" : node.active }
            ])}
             style={style.base}>
            <div style={style.title}>
                <FontIcon className="material-icons">{iconType}</FontIcon>
                {node.name}
            </div>
        </div>
    );
};

class PlaylistTreeView extends React.Component {
    constructor(props) {
        super(props);

        this.mappedPlaylists = this._mapPlaylists(props.playlists);

        this.state = {};

        this._onToggle = this._onToggle.bind(this);
    }

    _mapPlaylists(playlists) {
        return playlists.map(playlist => {
            let mappedPlayliat = {
                name: playlist.nom
            };
            if (playlist.isFolder) {
                mappedPlayliat = {
                    name: playlist.nom,
                    toggled : true,
                    children : this._mapPlaylists(playlist.children)
                };
            } else {

            }
            return mappedPlayliat;
        });
    }

    _onToggle = (node, toggled) => {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({ cursor: node });
    };


    render() {
        return (
            <div>
                <Treebeard
                    data={this.mappedPlaylists}
                    onToggle={this._onToggle}
                    decorators={decorators}
                />
            </div>);
    }
}

PlaylistTreeView.propTypes = {
    playlists : PropTypes.arrayOf(playlistPropType).isRequired
};

export default PlaylistTreeView;