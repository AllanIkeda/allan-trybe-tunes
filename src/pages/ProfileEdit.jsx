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

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.buttonValidation);
  };

  handleClick = () => {
    const { description, email, image, name } = this.state;
    this.setState({ isLoading: true }, async () => {
      await updateUser({ name, email, image, description });
    });
  };

  buttonValidation = () => {
    const { name, email, image, description } = this.state;
    const regEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return description && regEmail.test(email) && image && name
      ? this.setState({ buttonDisable: false }) : this.setState({ buttonDisable: true });
  };

  render() {
    const { name, email, image, description, isLoading, buttonDisable } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading && <Loading /> }
        <form>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={ name }
              data-testid="edit-input-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              value={ email }
              data-testid="edit-input-email"
              onChange={ this.handleChange }

            />
          </label>
          <label htmlFor="description">
            Description
            <input
              type="text"
              name="description"
              value={ description }
              data-testid="edit-input-description"
              onChange={ this.handleChange }

            />
          </label>
          <label htmlFor="image">
            Image
            <input
              type="text"
              name="image"
              value={ image }
              data-testid="edit-input-image"
              onChange={ this.handleChange }

            />
          </label>
          <button
            type="button"
            disabled={ buttonDisable }
            data-testid="edit-button-save"
            onClick={ this.handleClick }
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    );
  }
}
