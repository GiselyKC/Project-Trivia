import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userToken } from '../Redux/actions';
import getRequestTrivia from '../services/api';
import { saveLocalStorage } from '../utils/localStorage';
import logo from '../img/trivia.png';

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
    const { name, email } = this.state;
    event.preventDefault();
    const getToken = await getRequestTrivia();
    // console.log('GET TOKEN, LOGIN', getToken);
    saveLocalStorage('token', getToken);
    const { tokenUser } = this.props;
    const result = {
      token: getToken,
      name,
      email,
    };
    tokenUser(result);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { disabled, redirect } = this.state;
    const { history } = this.props;
    const { handleChange, handleClick } = this;

    if (redirect) {
      return <Redirect to="/jogo" />;
    }
    return (
      <main className="container">
        <div className="wrap-login">
          <form className="login-form">
            <img className="App-logo" src={ logo } alt="logo trivia" />
            <div className="wrap-input">
              <input
                data-testid="input-player-name"
                name="name"
                type="text"
                placeholder="nome"
                onChange={ handleChange }
                className="input"
              />
            </div>
            <div className="wrap-input">
              <input
                data-testid="input-gravatar-email"
                name="email"
                type="email"
                placeholder="email"
                onChange={ handleChange }
                className="input"
              />
            </div>
            <div className="container-login-form-btn">
              <button
                data-testid="btn-play"
                type="submit"
                disabled={ disabled }
                onClick={ handleClick }
                className="login-form-btn"
              >
                Play
              </button>
            </div>
            <div className="container-setting-btn">
              <button
                data-testid="btn-settings"
                type="button"
                onClick={ () => history.push('/settings') }
                className="setting-btn"
              >
                Settings
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  tokenUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  tokenUser: (value) => dispatch(userToken(value)),
});

export default connect(null, mapDispatchToProps)(Login);
