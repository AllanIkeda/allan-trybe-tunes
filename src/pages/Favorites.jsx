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
    await this.getfavorites();
    this.setState({ isLoading: false });
  }

  getfavorites = async () => {
    const favoriteList = await getFavoriteSongs();
    this.setState({
      musics: favoriteList });
  };

  removeFavorite = (id) => {
    console.log(id);
    const { musics } = this.state;

    const Array = musics.filter((music) => music.trackId !== id);
    this.setState({ musics: Array });
  };

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
            removeFavorite={ this.removeFavorite }
          />
        ))}
      </div>
    );
  }
}
