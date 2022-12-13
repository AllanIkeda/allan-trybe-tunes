import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    isLoading: false,
    user: {},
  };

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const resposta = await getUser();
      this.setState({
        isLoading: false,
        user: resposta,
      });
    });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading && <Loading /> }
        <nav>
          <Link to="/search" data-testid="link-to-search">Busca</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        <h2 data-testid="header-user-name">{user.name}</h2>
      </header>
    );
  }
}
