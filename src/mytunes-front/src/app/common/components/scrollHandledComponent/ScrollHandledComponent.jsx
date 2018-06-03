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
        this.scrollTo({ left : this.scrollPosition.left, top : this.scrollPosition.top });
    }

    _spyScroll() {
        document.querySelector(this.selector).addEventListener("scroll", (event) => {
            this.scrollPosition = { top : event.target.scrollTop, left : event.target.scrollLeft };
        });
    }

    scrollTo({left, top}) {
        setTimeout(() => {document.querySelector(this.selector).scrollTo(left, top)}, 0);
    }

    render() {
        return (<div></div>);
    }
}

export default ScrollHandledComponent;