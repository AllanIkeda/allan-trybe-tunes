import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    checked: false,
  };

  handleChange = ({ target: { checked } }) => {
    if (checked) this.setState({ checked });
    // console.log('oi changed');
  };

  handleClick = (song) => {
    // console.log('oi click');
    this.setState({ isLoading: true }, async () => {
      await addSong(song);
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { isLoading, checked } = this.state;
    const { musics } = this.props;
    // console.log(musics);
    return (
      <div data-testid="card-musics">
        { isLoading && <Loading /> }
        {
          musics.map((music) => {
            const { trackName, previewUrl, trackId } = music;
            return (
              <div key={ trackId }>
                <p>{ trackName }</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                </audio>
                <label htmlFor={ trackId }>
                  Favorita
                  <input
                    defaultChecked={ checked }
                    type="checkbox"
                    id={ trackId }
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ this.handleChange }
                    onClick={ () => this.handleClick(music) }
                  />
                </label>
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
