import React from 'react';

class ScrollHandledComponent extends React.Component {
    constructor(props, selector) {
        super(props);
        this.selector = selector;
        this.scrollPosition = { left : 0, top : 0 };
    }

    componentDidMount() {
        this._spyScroll();
    }

    componentDidUpdate () {
        this._spyScroll();
        document.querySelector(this.selector).scrollTo(this.scrollPosition.left, this.scrollPosition.top);
    }

    _spyScroll() {
        document.querySelector(this.selector).addEventListener("scroll", (event) => {
            this.scrollPosition = { top : event.target.scrollTop, left : event.target.scrollLeft };
            console.debug(this.scrollPosition);
        });
    }

    scrollTo({left, top}) {
        document.querySelector(this.selector).scrollTo(left, top);
    }

    render() {
        return (<div></div>);
    }
}

export default ScrollHandledComponent;