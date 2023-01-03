import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
    buttonDisable: true,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
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
    const { name, email, image, description, isLoading, buttonDisable } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading && <Loading /> }
        <form>
          <label htmlFor="name">
            Name
            <input type="text" name="name" value={ name } data-testid="edit-input-name" />
          </label>
          <label htmlFor="name">
            Email
            <input
              type="text"
              name="email"
              value={ email }
              data-testid="edit-input-email"
            />
          </label>
          <label htmlFor="name">
            Description
            <input
              type="text"
              name="description"
              value={ description }
              data-testid="edit-input-description"
            />
          </label>
          <label htmlFor="name">
            Image
            <input
              type="text"
              name="image"
              Value={ image }
              data-testid="edit-input-image"
            />
          </label>
          <button type="button" disabled={ buttonDisable } data-testid="edit-button-save">
            Salvar Alterações
          </button>
        </form>
      </div>
    );
  }
}
