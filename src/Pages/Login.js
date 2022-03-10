import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { history } = this.props;
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
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
