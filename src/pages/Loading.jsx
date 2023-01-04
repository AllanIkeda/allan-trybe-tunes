import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="text-center">
        <img src="https://www.supervalemg.com.br/VALESITE/_lib/img/loadingautentica.gif" alt="Loading-icon" />
        <h2>Carregando...</h2>
      </div>
    );
  }
}
