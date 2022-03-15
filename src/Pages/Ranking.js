import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { returnLocalStorage } from '../utils/localStorage';

export default class Ranking extends Component {
  state = {
    redirect: false,
  }

  getRaking = () => {
    const getlocalStorage = returnLocalStorage('ranking');
    console.log(getlocalStorage);
  };

  handleButton = (event) => {
    event.preventDefault();
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { handleButton } = this;
    const { redirect } = this.state;
    this.getRaking();

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <title data-testid="ranking-title">Ranking</title>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ handleButton }
        >
          Inicio
        </button>
      </div>
    );
  }
}
