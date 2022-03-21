import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { returnLocalStorage } from '../utils/localStorage';

class Ranking extends Component {
  state = {
    redirect: false,
    rankingList: [],
  }

  componentDidMount() {
    // ler local storage da chave ranking
    const ranking = returnLocalStorage('ranking');
    const um = 1;
    // fazer sort pelo score
    // referência https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
    const sortRanking = ranking.sort((a, b) => ((a.score > b.score) ? -um : um));
    // salva no state rankingList
    this.setState({
      rankingList: sortRanking,
    });
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
    const { redirect, rankingList } = this.state;
    this.getRaking();

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <title data-testid="ranking-title">Ranking</title>
        {
          rankingList.map((ranking, index) => (
            <>
              {console.log(ranking)}
              <img
                src={ ranking.picture }
                alt="user"
                key={ index }
              />
              <p data-testid={ `"player-name"-${index}` }>{ranking.name}</p>
              <p data-testid={ `"player-score"-${index}` }>{ranking.score}</p>
            </>
          ))
        }
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

export default Ranking;
