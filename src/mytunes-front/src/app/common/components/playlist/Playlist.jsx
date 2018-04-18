import React from 'react';
import PropTypes from "prop-types";
import * as classnames from "classnames";
import PlaylistItem from "./PlaylistItem";

export default class Playlist extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collapsed : true
    }
  }
  
  render() {
    return (
      <section id="playlist">
        <div id="playlistAnchor"
             className={ classnames("metal-bg", this.state.collapsed ? "collapsed" : "") }
             onClick={ this.toggle.bind(this) }>
          Playlist
        </div>
        <div id="playlistTab"
             className={ this.state.collapsed ? "collapsed" : "" }>
          <ul className="playlistMusiqueList">
            { this.props.musiques.map(musique => {
              return (
                <PlaylistItem key={ "playlist_" + musique.itunesId } musique={ musique } />
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
  
  toggle() {
    this.setState({
      ...this.state,
      collapsed : !this.state.collapsed
    })
  }
  
}

Playlist.propTypes = {
  musiques: PropTypes.array.isRequired
};
