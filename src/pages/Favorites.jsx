import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Favorites extends Component {
  state = {
    isLoading: false,
    musics: [],
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const favorite = await getFavoriteSongs(); this.setState({
      musics: favorite.map((music) => music),
      isLoading: false,
    });
  }

  render() {
    const { isLoading, musics } = this.state;
    return (
      <div data-testid="page-favorites">
        { isLoading && <Loading /> }
        <Header />
        {musics.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
          />
        ))}
      </div>
    );
  }
}
