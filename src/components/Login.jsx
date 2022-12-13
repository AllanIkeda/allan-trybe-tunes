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

  handleInfo = ({ target: { name, value } }) => {
    const TAM_MAX = 3;
    const compara = value.length >= TAM_MAX;
    this.setState({
      [name]: value,
      disable: !compara,
    });
  };

  handleBtn = (user) => {
    const { history } = this.props;
    this.setState({ isLoading: true }, async () => {
      if (user) {
        await createUser({ name: user });
        return history.push('/search');
      }
    });
  };

  render() {
    const { name, disable, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            name={ name }
            data-testid="login-name-input"
            onChange={ this.handleInfo }
          />
          <button
            disabled={ disable }
            data-testid="login-submit-button"
            type="button"
            onClick={ () => this.handleBtn(name) }
          >
            Entrar
          </button>
        </form>
        { isLoading && <Loading />}
      </div>
    );
  }
}
