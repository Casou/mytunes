import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import '../../../../style/components/loading.css';

const Loading = (props) => (
    <div id={"loading"} className={cn({ "closed" : !props.open })}>
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
    open : PropTypes.bool.isRequired
};
Loading.defaultProps = {
    open : false
};

export default Loading;