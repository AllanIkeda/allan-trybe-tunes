import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    checked: false,
  };

  async componentDidMount() {
    this.setState({
      checked: await this.getFavorite(),
    });
  }

  getFavorite = async () => {
    const { music: { trackId } } = this.props;
    const favorite = await getFavoriteSongs();
    return favorite.map((music) => music.trackId).includes(trackId);
  };

  handleChange = ({ target: { checked } }) => {
    this.handleClick(checked);
    this.setState({ checked });
  };

  handleClick = async (checked) => {
    const { music, removeFavorite } = this.props;
    this.setState({ isLoading: true });
    if (checked) {
      await addSong(music);
      this.setState({ isLoading: false });
    }
    if (!checked) {
      await removeSong(music.trackId);
      this.setState({ isLoading: false });
    }
    if (removeFavorite) {
      removeFavorite(music.trackId);
    }
  };

  render() {
    const { isLoading, checked } = this.state;
    const { music } = this.props;

    return (
      <li data-testid="card-musics">
        { isLoading && <Loading /> }
        <p>{ music.trackName }</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ music.trackName }>
          Favorita
          <input
            checked={ checked }
            id={ music.trackName }
            type="checkbox"
            data-testid={ `checkbox-music-${music.trackId}` }
            onChange={ this.handleChange }
            // onClick={ () => this.handleClick(music) }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    length: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  removeFavorite: PropTypes.func.isRequired,
};
