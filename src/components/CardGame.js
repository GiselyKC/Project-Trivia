import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { userScore, setTime } from '../Redux/actions';
import { saveLocalStorage, returnLocalStorage } from '../utils/localStorage';
import Timer from './Timer';
import './CardGame.css';

class CardGame extends Component {
state = {
  shufleArray: [],
  indexCard: 0,
  card: {},
  score: 0,
  nextTime: false,
  disabled: true,
  buttonClickDisable: false,
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
    const { indexCard } = this.state;
    const { history } = this.props;
    const lastCard = 4;
    this.setState({
      disabled: true,
      buttonClickDisable: false,
    });
    if (indexCard === lastCard) {
      history.push('/feedback');
    }
    const seconds = 30;
    const { dispatchSetTime } = this.props;
    dispatchSetTime(seconds);
    this.setState({
      nextTime: true,
    });
    this.setState({
      indexCard: indexCard + 1,
    }, () => this.setState({
      shufleArray: this.arrayOriginal(),
    }));
  }

  // changeClassQuestion = (element) => {
  //   const { trueQuestion, wrongQuestion } = this.state;
  //   if (trueQuestion) element.classList.add('correct');
  //   if (!trueQuestion) element.classList.remove('correct');
  //   if (wrongQuestion) element.classList.add('wrong');
  //   if (!wrongQuestion) element.classList.remove('wrong');
  // };

  handleClickQuestions = async ({ target: { value } }) => {
    this.setState({ buttonClickDisable: true });
    const { score, card: { difficulty } } = this.state;
    const { name, picture, scoreGameDispatch, time } = this.props;
    const timer = time;
    const NUMBER = 10;
    const difficultyQuestion = { easy: 1, medium: 2, hard: 3 };
    const scoreQuestions = NUMBER + (timer * difficultyQuestion[difficulty]);
    if (value === 'correct-answer') {
      scoreGameDispatch(scoreQuestions);
      this.setState({ score: score + scoreQuestions });
    }
    this.setState({
      disabled: false,
    });
    const returnLS = returnLocalStorage('ranking');
    saveLocalStorage('ranking', [...returnLS, {
      name,
      picture: `https://www.gravatar.com/avatar/${picture}`,
      score,
    }]);
  }

  buttonDisable = () => {
    const { time } = this.props;
    const { buttonClickDisable } = this.state;
    return (time === 0 || buttonClickDisable);
  }

  render() {
    const { shufleArray, card, nextTime, disabled } = this.state;
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
                // onClick={ this.questionOnClick }
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
        {(!disabled || this.buttonDisable()) && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleClick }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

CardGame.propTypes = {
  dispatchSetTime: PropTypes.func.isRequired,
  history: PropTypes.objectOf({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  results: PropTypes.arrayOf().isRequired,
  scoreGameDispatch: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  name: state.player.name,
  picture: md5(state.player.gravatarEmail).toString(),
  time: state.time,
});
const mapDispatchToProps = (dispatch) => ({
  scoreGameDispatch: (value) => dispatch(userScore(value)),
  dispatchSetTime: (value) => dispatch(setTime(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CardGame);
