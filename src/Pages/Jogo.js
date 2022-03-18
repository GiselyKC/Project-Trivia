import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import getRequestTrivia, { getGameTrivia } from '../services/api';
import CardGame from '../components/CardGame';
import Header from './Header';
import { saveLocalStorage, returnLocalStorage } from '../utils/localStorage';
import { userToken } from '../Redux/actions';
import pergaminho from '../img/pergaminho.png';

class Jogo extends Component {
  state = {
    results: [],
    render: false,
  }

  async componentDidMount() {
    const errorNumber = 3;
    const getToken = await returnLocalStorage('token');
    // console.log('TOKEN DEVERIA', getToken);
    const getApi = await getGameTrivia(getToken);
    // console.log('XABLAU', getApi);
    if (getApi.response_code === errorNumber) {
      const newToken = await getRequestTrivia();
      // console.log('NOVO TOKEN', newToken);
      const newGetApi = await getGameTrivia(newToken);
      saveLocalStorage('token', newToken);
      this.setState({
        results: newGetApi.results,
      }, () => {
        // this.renderRandom();
      });
      const { tokenUser } = this.props;
      const result = {
        token: newToken,
      };
      tokenUser(result);
    }
    this.setState({
      results: getApi.results,
      render: true,
    });
  }

  handleClick =() => {
    this.setState({ render: false });
    this.setState({
      render: true,
    });
  }

  render() {
    const { results, render } = this.state;
    const { history } = this.props;

    return (
      <div className="container-jogo">
        <img className="pergaminho-card" src={ pergaminho } alt="pergaminho" />
        <main className="container-card">
          <Header />
          {render && results.length > 0
            ? <CardGame history={ history } results={ results } /> : <p>Loading...</p>}
        </main>
      </div>
    );
  }
}

Jogo.propTypes = {
  history: PropTypes.objectOf.isRequired,
  tokenUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  tokenUser: (value) => dispatch(userToken(value)),
});

export default connect(null, mapDispatchToProps)(Jogo);
