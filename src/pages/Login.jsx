import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Styles
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import '../styles/login.css';

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
      <div data-testid="page-login" className="main-container-login container w-50 p-3">
        { isLoading && <Loading />}
        { redirect && <Redirect to="/search" /> }
        <img src={ logo } alt="logo-tipo" />
        <Form>
          {/* <input
            type="text"
            data-testid="login-name-input"
            placeholder="Qual é o seu Nome?"
            onChange={ this.validationBtn }
          /> */}
          <FloatingLabel
            controlId="floatingInput"
            label="Qual é o seu Nome?"
            className="mb-2"
          >
            <Form.Control
              type="text"
              placeholder="Qual é o seu Nome?"
              data-testid="login-name-input"
              onChange={ this.validationBtn }
              className="mt-3"

            />
          </FloatingLabel>
          <Button
            className="w-100"
            variant="primary"
            disabled={ disable }
            data-testid="login-submit-button"
            type="button"
            onClick={ this.handleBtn }
          >
            Entrar
          </Button>
        </Form>
      </div>
    );
  }
}
