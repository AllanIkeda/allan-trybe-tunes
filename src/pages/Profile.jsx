import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
  };

  async componentDidMount() {
    // this.setState({ isLoading: true });
    const { name, email, image, description } = await getUser();
    this.setState({
      name,
      email,
      image,
      description,
      isLoading: false,
    });
  }

  render() {
    const { name, email, image, description, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        { isLoading && <Loading /> }
        <Header />
        <section>
          <img src={ image } data-testid="profile-image" alt="imagem-de-perfil" />
          <h3>Nome</h3>
          <p>{ name }</p>
          <h3>Email</h3>
          <p>{ email }</p>
          <h3>Descrição</h3>
          <p>{ description }</p>
        </section>
        <Link
          to="/profile/edit"
        >
          Editar perfil
        </Link>
      </div>
    );
  }
}
