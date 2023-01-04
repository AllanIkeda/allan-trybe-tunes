import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

// Styles
import '../styles/search.css';

import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    disable: true,
    albuns: [],
    valueSearch: '',
    isLoading: false,
    result: false,
    failed: false,
    artistName: '',
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
      artistName: valueSearch,
    });
    const albuns = await searchAlbumsAPI(valueSearch);

    this.setState({
      albuns,
      valueSearch: '',
      result: true,
      isLoading: false,
    });
    if (albuns.length === 0) {
      this.setState({
        result: false,
        failed: true,
      });
    }
  };

  render() {
    const { disable,
      valueSearch,
      isLoading,
      result,
      albuns,
      failed,
      artistName,
    } = this.state;
    return (
      <div data-testid="page-search">
        { failed && <p>Nenhum álbum foi encontrado</p> }
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
              {`Resultado de álbuns de: ${
                artistName
              }`}
            </h3>
          ) : null}
        { albuns.map(({ collectionId, artworkUrl100, collectionName }) => (
          <div key={ collectionId }>
            <img src={ artworkUrl100 } alt="foto-album" />
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              {collectionName}
              {' '}

            </Link>
          </div>
        ))}
      </div>
    );
  }
}
