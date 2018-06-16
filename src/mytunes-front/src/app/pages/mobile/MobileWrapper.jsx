import React from 'react';
import { Page, Button, Splitter, SplitterSide, List, ListItem, SplitterContent, Range } from 'react-onsenui';
import * as ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";

import "../../../style/components/mobile/main.css";
import Menu from "./common/components/Menu";

class MobileWrapper extends React.Component {

    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
        this.menuRef = null;
    }

    componentDidUpdate() {
        // const totalHeight = document.getElementById("volumeSlider").offsetHeight;
        // const sliderSize = parseInt(totalHeight * 0.9);
        //
        // const translateX = sliderSize * -0.53;
        // const translateY = sliderSize * -0.428;
        // document.getElementById("volumeSliderRange").style["transform"] = `rotate(-90deg) translate(${translateX}px, ${translateY}px)`;
        // document.getElementById("volumeSliderRange").style["width"] = sliderSize + "px";
    }

    _handleClick = () => {
        ons.notification.alert('Hello world!');
    };

    render() {
        return (
            <Splitter>
                <Menu ref={ instance => this.menuRef = instance }/>
                <SplitterContent>
                    <Page renderToolbar={() => <Header toggleMenu={ this.menuRef && this.menuRef.toggleMenu } />}
                          renderBottomToolbar={() => <Footer />}>
                        <section id={"mainPageContent"}>
                            <p>https://onsen.io/v2/api/react/</p>
                            <p>https://onsen.io/v2/api/angular2/ ons.notification.html</p>
                            <Button onClick={this._handleClick}>Push button</Button>
                        </section>

                        <section id={"volumeSlider"}>
                            <div className="rangeSlider">
                                <input type={"range"} orient="vertical" min={0} max={100} defaultValue={75} />
                            </div>
                        </section>
                    </Page>
                </SplitterContent>
            </Splitter>
        );
    }

}

export default MobileWrapper;