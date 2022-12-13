import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    disable: true,
    // isLoading: false,
  };

  validationBtn = ({ target: { value } }) => {
    const TAM_MAX = 2;
    const compara = value.length >= TAM_MAX;
    this.setState({
      disable: !compara,
    });
  };

  render() {
    const { disable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.validationBtn }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disable }
            // onClick={ this.validationBtn }
          >
            Pesquisar
          </button>
        </form>
        Search
      </div>
    );
  }
}
