import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    artistName: '',
    albumName: '',
  };

  tratamento = async (id) => {
    const musics = await getMusics(id);
    console.log(musics.results);
    return musics.results;
  };

  render() {
    const { match: { params: { id } } } = this.props;
    const { artistName, albumName } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{albumName}</h2>
        { this.tratamento(id)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
