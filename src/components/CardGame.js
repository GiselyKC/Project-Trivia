import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userScore } from '../Redux/actions';
import { saveLocalStorage, returnLocalStorage } from '../utils/localStorage';
import Timer from './Timer';
import { setTime } from '../Redux/actions';

class CardGame extends Component {
state = {
  shufleArray: [],
  indexCard: 0,
  card: {},
  score: 0,
  nextTime: false,
}

componentDidMount() {
  this.setState({
    shufleArray: this.arrayOriginal(),
  });
}

  arrayOriginal = () => {
    const { indexCard } = this.state;
    const { results } = this.props;
    // console.log(results);
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

  handleClickQuestions = async ({ target: { value } }) => {
    const { score, card: { difficulty } } = this.state;
    const { name, picture, scoreGameDispatch } = this.props;
    const timer = 10;
    const NUMBER = 10;
    const difficultyQuestion = { easy: 1, medium: 2, hard: 3 };
    const scoreQuestions = NUMBER + (timer * difficultyQuestion[difficulty]);
    if (value === 'correct-answer') {
      scoreGameDispatch(scoreQuestions);
      this.setState({ score: score + scoreQuestions });
    }
    const returnLS = returnLocalStorage('ranking');
    saveLocalStorage('ranking', [...returnLS, {
      name,
      picture,
      score,
    }]);
    
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
                  data-testid="correct-answer"
                  type="button"
                  value={ question.dataTest }
                  onClick={ this.handleClickQuestions }
                  disabled={ this.buttonDisable() }
                >
                  { question.answer }
                </button>
              );
            } return (
              <button
                data-testid={ question.dataTest }
                type="button"
                key={ question.key }
                value={ question.dataTest }
                onClick={ this.handleClickQuestions }
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
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  scoreGameDispatch: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  name: state.player.name,
  picture: state.player.gravatarEmail,
  time: state.time,
});
const mapDispatchToProps = (dispatch) => ({
  scoreGameDispatch: (value) => dispatch(userScore(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CardGame);