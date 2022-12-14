import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    disable: true,
    albuns: [],
    valueSearch: '',
    isLoading: false,
    result: false,
    // artist: '',
  };

  validationBtn = ({ target: { value } }) => {
    const TAM_MAX = 2;
    const compara = value.length >= TAM_MAX;
    this.setState({
      disable: !compara,
      valueSearch: value,
    });
  };

  handleClick = async () => {
    const { valueSearch } = this.state;
    this.setState({
      isLoading: true,
      result: true,
    });
    const albuns = await searchAlbumsAPI(valueSearch);
    // const artist = albuns.find((artista) => artista).artistName;
    // console.log(albuns);
    // console.log(albuns.find((artista) => artista).artistName);
    this.setState({
      albuns,
      valueSearch: '',
      isLoading: false,
      // artist,
    });
    if (albuns.length === 0) {
      this.setState({ result: false });
    }
  };

  render() {
    const { disable, valueSearch, isLoading, result, artist, albuns } = this.state;
    return (
      <div data-testid="page-search">
        { !result && <p>Nenhum álbum foi encontrado</p> }
        { isLoading && <Loading />}
        <Header />
        <form>
          <input
            value={ valueSearch }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.validationBtn }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disable }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        {result
          ? (
            <h3>
              {`Resultado de álbuns de: ${artist}`}
            </h3>
          ) : null}
        { albuns.map((album) => (
          <div key={ album.collectionId }>
            <img src={ album.artworkUrl100 } alt="foto-album" />
          </div>
        ))}
      </div>
    );
  }
}
