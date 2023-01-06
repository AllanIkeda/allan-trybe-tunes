import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
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
    artistNameS: '',
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
      artistNameS: valueSearch,
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
      artistNameS,
    } = this.state;
    return (
      <div data-testid="page-search" className="page-main-search">
        { isLoading && <Loading />}
        <Header />
        <form className="main-search">
          <div className="input-search">
            <input
              value={ valueSearch }
              type="text"
              data-testid="search-artist-input"
              onChange={ this.validationBtn }
            />
            <Button
              className="btn-search"
              variant="outline-info"
              data-testid="search-artist-button"
              disabled={ disable }
              onClick={ this.handleClick }
            >
              Pesquisar
            </Button>
            {/* <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disable }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button> */}
          </div>
        </form>
        <div />
        { failed && <p>Nenhum álbum foi encontrado</p> }
        <section className="albuns-list">

          {result
            ? (
              <h3 className="display-album">
                {`Resultado de álbuns de: ${
                  artistNameS
                }`}
              </h3>
            ) : null}
          { albuns.map(({ artistName, collectionId, artworkUrl100, collectionName }) => (
            <div key={ collectionId }>
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                <img src={ artworkUrl100 } alt="foto-album" />
                <h5>
                  {collectionName}
                </h5>
                {' '}
                <h6>
                  {artistName}
                </h6>
              </Link>
            </div>
          ))}
        </section>
      </div>
    );
  }
}
