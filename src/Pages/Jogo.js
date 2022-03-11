import React, { Component } from 'react';
import { getGameTrivia } from '../services/api';
import CardGame from '../components/CardGame';

class Jogo extends Component {
  state = {
    results: [],
    // cardQuestion: {},
    render: false,
    index: 0,
  }

  async componentDidMount() {
    const getApi = await getGameTrivia();
    // console.log(getApi);
    this.setState({
      results: getApi,
    }, () => {
      this.renderRandom();
    });
  }

  renderRandom =() => {
    const multiplicador = 4;
    const randomIndex = (Math.random() * multiplicador).toFixed(0);
    this.setState({
      render: true,
      index: randomIndex,
    });
  }

  render() {
    const { results, render, index } = this.state;
    return (
      <div>
        <h1>Jogo</h1>
        {render ? <CardGame card={ results[index] } /> : <p>Loading...</p>}
        {render ? <button type="button"> Próximo</button> : null }
      </div>
    );
  }
}

export default Jogo;
