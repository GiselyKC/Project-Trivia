import React, { Component } from 'react';
import { getGameTrivia } from '../services/api';
import CardGame from '../components/CardGame';
import Header from './Header';

class Jogo extends Component {
  state = {
    results: [],
    render: false,
    index: 0,
    // prevStateIndex: [],
  }

  async componentDidMount() {
    const getApi = await getGameTrivia();
    this.setState({
      results: getApi,
    }, () => {
      this.renderRandom();
    });
  }

  renderRandom =() => {
    const { index } = this.state;
    this.setState({ render: false }, () => {
      const multiplicador = 4;
      const randomIndex = Number(Math.random() * multiplicador).toFixed(0);
      if (index === 0) {
        this.setState({
          render: true,
          index: randomIndex,
        });
      } this.setState({
        render: true,
        index: index === multiplicador ? index * 0 : index + 1,
      });
    });
  }

  handleClick = () => {
    this.renderRandom();
  }

  render() {
    const { results, render, index } = this.state;
    return (
      <div>
        <h1>Jogo</h1>
        <Header />
        {render ? <CardGame card={ results[index] } /> : <p>Loading...</p>}
        {render
          ? <button type="submit" onClick={ this.handleClick }> Próximo</button> : null }
      </div>
    );
  }
}

export default Jogo;
