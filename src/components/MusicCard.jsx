import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    checked: false,
  };

  handleClick = async (song) => {
    // console.log(song);
    this.setState({
      isLoading: true,
      checked: false,
    });
    const favoritando = await addSong(song);
    console.log(favoritando);
    this.setState({
      isLoading: false,
      checked: true,
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
