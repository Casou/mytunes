import React from 'react';
import PropTypes from 'prop-types';
import {Treebeard, decorators, theme} from 'react-treebeard';
import {FontIcon, TextField} from "material-ui";
import cn from "classnames";
import {playlistPropType} from "../../../types/PlaylistType";
import {__KEYCODE_ENTER__} from "../../../../../App";

theme.tree.node.activeLink.background = '#dde7ff';

decorators.Header = ({style, node}) => {
    const iconType = node.children ? 'folder' : 'dehaze';

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
                {node.name} <span className={"nbMusiques"}>{ node.nbMusiques } musique{ node.nbMusiques > 1 ? "s" : "" }</span>
            </div>
        </div>
    );
};

class PlaylistTreeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cursor : null
        };

        this._onToggle = this._onToggle.bind(this);
    }

    _mapPlaylists(playlists) {
        return playlists.map(playlist => {
            const mappedPlaylist = {
                id: playlist.id,
                name: playlist.nom,
                nbMusiques : playlist.musiqueIds.length
            };
            if (playlist.isFolder) {
                mappedPlaylist.toggled = true;
                mappedPlaylist.children = this._mapPlaylists(playlist.children);
            }
            return mappedPlaylist;
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
        this.props.onChoosePlaylist(node.id);
    };

    render() {
        const mappedPlaylists = this._mapPlaylists(this.props.playlists);

        return (
            <div>
                { this.props.onFilter ?
                    <div className={"searchPlaylist"}>
                        <FontIcon className="material-icons">search</FontIcon>
                        <TextField className="textField" name={"searchPlaylist"} placeholder={"Recherche"}
                                   onKeyPress={e => {
                                       if (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__) {
                                           this.props.onFilter(e.target.value);
                                       }
                                   }}
                        />
                    </div>
                    :
                    ""
                }
                <Treebeard
                    data={mappedPlaylists}
                    onToggle={this._onToggle}
                    decorators={decorators}
                    theme={theme}
                />
            </div>);
    }
}

PlaylistTreeView.propTypes = {
    playlists : PropTypes.arrayOf(playlistPropType).isRequired,
    onChoosePlaylist : PropTypes.func.isRequired,
    onFilter : PropTypes.func
};

export default PlaylistTreeView;