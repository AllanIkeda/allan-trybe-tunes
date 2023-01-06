import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, PersonCircle } from 'react-bootstrap-icons';
// styles
import '../styles/Header.css';
import logo from '../images/logo.png';
import userPNG from '../images/profile-user.png';

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
      console.log(resposta);
      this.setState({
        isLoading: false,
        user: resposta,
      });
    });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <header data-testid="header-component" className="header-container">
        { isLoading && <Loading /> }
        <nav>
          <Link className="link" to="/search" data-testid="link-to-search">
            <img src={ logo } alt="logo-tipo" className="img-logo" />
          </Link>
          <Link className="link" to="/search" data-testid="link-to-search">
            <Search />
            {'  '}
            Pesquisa
          </Link>
          <Link
            className="link"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            <Star />
            {'  '}
            Favoritos
          </Link>
          <Link className="link" to="/profile" data-testid="link-to-profile">
            <PersonCircle />
            {'  '}
            Perfil
          </Link>
          <div className="down-user">
            {user.image ? <img className="userIcon" src={ user.image } alt="userIcon" />
              : <img className="down-user-img" src={ userPNG } alt="imagem de perfil" />}

            <h4 data-testid="header-user-name">{user.name}</h4>

          </div>
        </nav>

      </header>
    );
  }
}
