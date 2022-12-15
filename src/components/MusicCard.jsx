import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    // console.log(musics);
    return (
      <div data-testid="card-musics">
        {
          musics.map((music) => {
            const { trackName, previewUrl } = music;
            // console.log(music);
            return (
              <div key={ trackName }>
                <p>{ trackName }</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                </audio>
              </div>
            );
          })
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
    length: PropTypes.number,
  }),
}.isRequired;
