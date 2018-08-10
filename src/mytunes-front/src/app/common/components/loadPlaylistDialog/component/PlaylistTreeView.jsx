import React from 'react';
import PropTypes from 'prop-types';
import {Treebeard, theme} from 'react-treebeard';
import defaultDecorators from './TreeNodeDecorators';

import '../style/treeView.css';

class PlaylistTreeView extends React.Component {

    constructor(props) {
        super(props);

        this._onToggle = this._onToggle.bind(this);

        this.state = {
            cursor : props.playlistSelected ? { id : props.playlistSelected } : null,
            data : this._mapData(props)
        };

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                ...this.state,
                data : this._mapData(nextProps)
            });

        }
    }

    render() {
        return (
            <div className={"playlistTreeView"}>
                <Treebeard
                    data={this.state.data}
                    onToggle={this._onToggle.bind(this)}
                    decorators={defaultDecorators}
                    theme={theme}
                />
            </div>
        );
    }

    _mapData(props) {
        return props.playlistSelected ?
            this._activateNode(props.data, props.playlistSelected)
            : props.data
    }

    _activateNode = (data, nodeId) => {
        return data.map(datum => {
            if (datum.id === nodeId) {
                datum.active = true;
            } else {
                datum.active = false;
            }
            if (datum.children) {
                datum.children = this._activateNode(datum.children, nodeId);
            }
            return datum;
        });
    };

    _onToggle = (node, toggled) => {
        if (!node.selectable) {
            return;
        }

        const { cursor } = this.state;
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (this.props.toggleOnClick && node.children) {
            node.toggled = toggled;
        }
        this.setState({ ...this.state, cursor: node });

        if (this.props.onToggle) {
            this.props.onToggle(node);
        }
    };
}

PlaylistTreeView.propTypes = {
    data : PropTypes.array.isRequired,
    playlistSelected : PropTypes.number,
    onToggle : PropTypes.func,
    toggleOnClick : PropTypes.bool
};

PlaylistTreeView.defaultProps = {
    toggleOnClick : true
};

export default PlaylistTreeView;