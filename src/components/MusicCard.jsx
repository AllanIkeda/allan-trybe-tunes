import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}
