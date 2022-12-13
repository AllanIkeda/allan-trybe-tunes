import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    name: '',
    disable: true,
    isLoading: false,
  };

  validationBtn = ({ target: { value } }) => {
    const TAM_MAX = 3;
    const compara = value.length >= TAM_MAX;
    this.setState({
      name: value,
      disable: !compara,
      redirect: false,
    });
  };

  handleBtn = async () => {
    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({
      isLoading: false,
      redirect: true,
    });
  };

  render() {
    const { disable, isLoading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading && <Loading />}
        { redirect && <Redirect to="/search" /> }
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.validationBtn }
          />
          <button
            disabled={ disable }
            data-testid="login-submit-button"
            type="button"
            onClick={ this.handleBtn }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
