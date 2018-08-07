import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from "@material-ui/core";
import cn from 'classnames';
import '../../../../style/components/loading.css';

const Loading = (props) => (
    <div id={"loading"} className={cn({ "closed" : !props.open })}>
        <div id={"loadingClose"} onClick={props.onForceClose}>
            <Icon className="material-icons">close</Icon>
        </div>
        <div id={"loadingContent"}>
            <div id={"loadingContentText"}>
                Loading
            </div>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
);

Loading.propTypes = {
    open : PropTypes.bool.isRequired,
    onForceClose : PropTypes.func
};
Loading.defaultProps = {
    open : false
};

export default Loading;