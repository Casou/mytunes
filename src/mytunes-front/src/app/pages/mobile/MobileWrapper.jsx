import React from 'react';
import { Page, Button, Splitter, SplitterSide, List, ListItem, SplitterContent, Range } from 'react-onsenui';
import * as ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";

import "../../../style/components/mobile/main.css";

class MobileWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen : false
        };

        this._handleClick = this._handleClick.bind(this);
        this._toggleMenu = this._toggleMenu.bind(this);
        this._showMenu = this._showMenu.bind(this);
        this._hideMenu = this._hideMenu.bind(this);
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

    _toggleMenu = () => {
        this.setState({
            ...this.state,
            isMenuOpen : !this.state.isMenuOpen
        });
    };
    _showMenu = () => { this.setState({ ...this.state, isMenuOpen : true }); };
    _hideMenu = () => { this.setState({ ...this.state, isMenuOpen : false }); };

    render() {
        return (
            <Splitter>
                <SplitterSide style={{
                    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                }}
                              side='left'
                              width={200}
                              collapse={true}
                              swipeable={true}
                              isOpen={this.state.isMenuOpen}
                              onClose={this._hideMenu}
                              onOpen={this._showMenu}>
                    <Page>
                        <List dataSource={['Profile', 'Followers', 'Settings']}
                              renderRow={(title) => (
                                  <ListItem key={title} onClick={this._hideMenu} tappable>{title}</ListItem>
                              )}
                        />
                    </Page>
                </SplitterSide>
                <SplitterContent>
                    <Page renderToolbar={() => <Header toggleMenu={ this._toggleMenu } />}
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