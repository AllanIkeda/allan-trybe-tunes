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

  handleChange = ({ target: { checked } }) => {
    this.handleClick(checked);
    this.setState({ checked });
  };

  handleClick = async (checked) => {
    const { music } = this.props;
    this.setState({ isLoading: true });
    if (checked) {
      await addSong(music);
      this.setState({ isLoading: false });
    }
    if (!checked) {
      await removeSong(music);
      this.setState({ isLoading: false });
    }
  };

  getFavorite = async () => {
    const { music: { trackId } } = this.props;
    const favorite = await getFavoriteSongs();
    return favorite.map((music) => music.trackId).includes(trackId);
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
        <label htmlFor={ music.trackId }>
          Favorita
          <input
            checked={ checked }
            type="checkbox"
            id={ music.trackId }
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
  musics: PropTypes.shape({
    length: PropTypes.number,
  }),
}.isRequired;
