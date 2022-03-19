import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import '../components/Feedback.css';

class Feedback extends React.Component {
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
    const numberAlternatives = 3;
    const { redirectPlay, redirectRanking } = this.state;
    const { handleButtonPlay, handleButtonRanking } = this;
    const { points, score } = this.props;

    if (redirectPlay) {
      return <Redirect to="/" />;
    }
    if (redirectRanking) {
      return <Redirect to="/ranking" />;
    }

    return (
      <div className="container-feedback">
        <h1>Feedback</h1>
        <div className="wrap-feedback">
          <div className="wrap-feedback-user">
            <Header />

            {
              ((points < numberAlternatives)
            && <h2 data-testid="feedback-text">Could be better...</h2>)
            || ((points >= numberAlternatives)
            && <h2 data-testid="feedback-text">Well Done!</h2>)
            }
            <p data-testid="feedback-total-question">{`Acertos: ${points}`}</p>
            <p data-testid="feedback-total-score">{`Pontuação: ${score}`}</p>
          </div>
          <div className="wrap-feedback-btn">
            <button
              className="feedback-btn"
              type="button"
              data-testid="btn-play-again"
              onClick={ handleButtonPlay }
            >
              Play Again
            </button>
            <button
              className="feedback-btn"
              type="button"
              data-testid="btn-ranking"
              onClick={ handleButtonRanking }
            >
              Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  points: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  points: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
