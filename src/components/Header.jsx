import React, { Component } from 'react';
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
        <h2 data-testid="header-user-name">{user.name}</h2>
      </header>
    );
  }
}
