import React, { Component } from 'react';

class Login extends Component {
  state= {
    disabled: true,
    name: '',
    email: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleClick());
  }

  handleClick = () => {
    const { name, email } = this.state;
    if (name !== '' && email !== '') {
      this.setState({
        disabled: false,
      });
    }
  }

  render() {
    const { disabled } = this.state;
    const { handleChange } = this;
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
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
