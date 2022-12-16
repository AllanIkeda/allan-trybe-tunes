import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    albunsInfo: {},
    musics: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      albunsInfo: musics[0],
      musics: musics.filter((music, index) => index !== 0),
    });
  }

  render() {
    const { albunsInfo, musics } = this.state;
    const { artistName, collectionName, artworkUrl100,
    } = albunsInfo;
    // console.log(albunsInfo);

    return (
      <div data-testid="page-album">
        <Header />
        <img src={ artworkUrl100 } alt="logo-do-album" />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h3 data-testid="album-name">{collectionName}</h3>
        <ul>
          { musics.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
            />
          ))}
        </ul>
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
