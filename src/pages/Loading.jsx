import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="text-center loading-screen">
        <Spinner animation="border" variant="primary" />
        <h2>Carregando...</h2>
      </div>
    );
  }
}
