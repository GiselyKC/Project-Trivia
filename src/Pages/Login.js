import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import getRequestTrivia from '../services/api';
import saveLocalStorage from '../utils/localStorage';

class Login extends Component {
  state= {
    disabled: true,
    name: '',
    email: '',
    redirect: false,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate = () => {
    const { name, email } = this.state;
    if (name !== '' && email !== '') {
      this.setState({
        disabled: false,
      });
    }
  }

  handleClick = async (event) => {
    event.preventDefault();
    this.setState({
      redirect: true,
    });
    await getRequestTrivia();
    const getStorageToken = saveLocalStorage('token');
  }

  render() {
    const { disabled, redirect } = this.state;
    const { handleChange, handleClick } = this;

    if (redirect) {
      return <Redirect to="/jogo" />;
    }
    return (
      <form>
        <input
          data-testid="input-player-name"
          name="name"
          type="text"
          placeholder="nome"
          onChange={ handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          name="email"
          type="email"
          placeholder="email"
          onChange={ handleChange }
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ disabled }
          onClick={ handleClick }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
