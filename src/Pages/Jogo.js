import React, { Component } from 'react';
import { getGameTrivia } from '../services/api';
import CardGame from '../components/CardGame';

class Jogo extends Component {
  state = {
    results: [],
  }

  async componentDidMount() {
    const getApi = await getGameTrivia();
    console.log(getApi);
    this.setState({
      results: getApi,
    });
  }

  render() {
    const { results } = this.state;

    return (
      <div>
        <h1>Jogo</h1>
        {
          results.map((result, index) => (
            <div key={ index }>
              <CardGame card={ result } />
            </div>
          ))
        }
      </div>
    );
  }
}

export default Jogo;
