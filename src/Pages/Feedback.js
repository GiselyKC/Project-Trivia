import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';

export default class Feedback extends React.Component {
  state = {
    redirectPlay: false,
    redirectRanking: false,
  }

  handleButtonPlay = (event) => {
    event.preventDefault();
    this.setState({
      redirectPlay: true,
    });
  }

  handleButtonRanking = (event) => {
    event.preventDefault();
    this.setState({
      redirectRanking: true,
    });
  }

  render() {
    const { redirectPlay, redirectRanking } = this.state;
    const { handleButtonPlay, handleButtonRanking } = this;

    if (redirectPlay) {
      return <Redirect to="/" />;
    }
    if (redirectRanking) {
      return <Redirect to="/ranking" />;
    }

    return (
      <div>
        <h1>Feedback</h1>
        <Header />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ handleButtonPlay }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ handleButtonRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}
