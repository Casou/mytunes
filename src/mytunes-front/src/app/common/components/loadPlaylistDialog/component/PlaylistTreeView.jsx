import React from 'react';
import PropTypes from 'prop-types';
import {Treebeard, theme} from 'react-treebeard';
import defaultDecorators from './TreeNodeDecorators';

import '../../../../../style/components/treeView.css';

class PlaylistTreeView extends React.Component {

    constructor(props) {
        super(props);

        this._onToggle = this._onToggle.bind(this);

        this.state = {
            cursor : null,
            data : props.data
        };
    }

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
}

PlaylistTreeView.propTypes = {
    data : PropTypes.array.isRequired,
    onToggle : PropTypes.func,
    toggleOnClick : PropTypes.bool
};

PlaylistTreeView.defaultProps = {
    toggleOnClick : true
};

export default PlaylistTreeView;