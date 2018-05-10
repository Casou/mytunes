import React from 'react';
import * as classnames from "classnames";
import { connect } from "react-redux";
import { assign } from "lodash";
import PropTypes from "prop-types";

import PlaylistItem from "./PlaylistItem";
import {playlistMusiquePropType} from "../../types/PlaylistMusique";

import '../../../../style/components/playlist.css';

class Playlist extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      collapsed : true,
      musiquePlaying : null
    };
  
    this.toggle = this.toggle.bind(this)
  }
  
  render() {
    const { collapsed, musiquePlaying } = this.state;
    const { playlist } = this.props;
    
    return (
      <section id="playlist">
        <div id="playlistAnchor"
             className={ classnames("metal-bg", collapsed ? "collapsed" : "") }
             onClick={ this.toggle }>
          Playlist
        </div>
        <div id="playlistTab"
             className={ collapsed ? "collapsed" : "" }>
          <ul className="playlistMusiqueList">
            { playlist.map(musique => {
              return (
                <PlaylistItem key={ "playlist_" + musique.id }
                              musique={ musique }
                              isPlaying={ musique === musiquePlaying }
                              alreadyPlayed={ musique.alreadyPlayed }
                />
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
  playlist: PropTypes.arrayOf(playlistMusiquePropType).isRequired
};

export default connect(state => assign({}, {
  playlist: state.playlist
}), null)(Playlist);
