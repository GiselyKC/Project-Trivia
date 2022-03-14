import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './Timer';
import { setTime } from '../Redux/actions';
import './Jogo.css';

class CardGame extends Component {
state ={
  shufleArray: [],
  indexCard: 0,
  card: {},
  nextTime: false,
}

componentDidMount() {
  this.setState({
    shufleArray: this.arrayOriginal(),
  });
}

  questionOnClick = ({ target }) => {
    if (target.id === 'correct') {
      target.className = 'correctQuestion';
    } target.className = 'wrongQuestion';
  }

  arrayOriginal = () => {
    const { indexCard } = this.state;
    const { results } = this.props;
    console.log(results);
    const card = results[indexCard];
    this.setState({
      card,
      nextTime: false,
    });
    const incorrects = card.incorrect_answers.map((question, index) => ({
      answer: question,
      dataTest: `wrong-answer-${index}`,
      key: index,
    }));
    const randomNumber = 0.5;
    // console.log([...card.incorrect_answers, { correct: card.correct_answer }]);
    const allQuestions = [...incorrects,
      { answer: card.correct_answer, dataTest: 'correct-answer' }]
      .sort(() => Math.random() - randomNumber);
    return allQuestions;
  }

  handleClick = () => {
    const seconds = 10;
    const { dispatch } = this.props;
    dispatch(setTime(seconds));
    this.setState({
      nextTime: true,
    });
    const { indexCard } = this.state;
    this.setState({
      indexCard: indexCard + 1,
    }, () => this.setState({
      shufleArray: this.arrayOriginal(),
    }));
  }

  buttonDisable = () => {
    const { time } = this.props;
    return (time === 0);
  }

  render() {
    const { shufleArray, card, nextTime } = this.state;
    const { time } = this.props;
    return (
      <div>
        <h1>CardGame</h1>
        {
          time === 0
            ? <strong><h2>TEMPO ESGOTADO</h2></strong>
            : <Timer newTimer={ nextTime } />
        }
        <p
          data-testid="question-category"
        >
          { card.category }
        </p>
        <p
          data-testid="question-text"
        >
          { card.question }
        </p>
        <div data-testid="answer-options">
          { shufleArray.map((question) => {
            if (question.dataTest === 'correct_answer') {
              return (
                <button
                  id="correct"
                  data-testid="correct-answer"
                  type="button"
                  disabled={ this.buttonDisable() }
                  onClick={ this.questionOnClick }
                >
                  { question.answer }
                </button>);
            } return (
              <button
                id="wrong"
                data-testid={ question.dataTest }
                onClick={ this.questionOnClick }
                type="button"
                key={ question.key }
                disabled={ this.buttonDisable() }
              >
                { question.answer }
              </button>
            );
          })}
        </div>
        <button type="button" onClick={ this.handleClick }> Próximo</button>
      </div>
    );
  }
}

CardGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
  results: PropTypes.arrayOf.isRequired,
  time: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  time: state.time,
});

export default connect(mapStateToProps)(CardGame);
