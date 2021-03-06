import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import sanitizeHtml from 'sanitize-html';
import { userScore, setTime } from '../Redux/actions';
import { saveLocalStorage, returnLocalStorage } from '../utils/localStorage';
import Timer from './Timer';
import './CardGame.css';

const CORRECT_ANSWER = 'correct-answer';

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
      { answer: card.correct_answer, dataTest: CORRECT_ANSWER }]
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

  handleClickQuestions = async ({ target: { value } }) => {
    const { score, indexCard, card: { difficulty } } = this.state;
    this.setState({ buttonClickDisable: true });
    const { name, picture, scoreGameDispatch, time } = this.props;
    const timer = time;
    const NUMBER = 10;
    const lastCard = 4;
    const difficultyQuestion = { easy: 1, medium: 2, hard: 3 };
    const scoreQuestions = NUMBER + (timer * difficultyQuestion[difficulty]);
    if (value === CORRECT_ANSWER) {
      scoreGameDispatch(scoreQuestions);
      this.setState({ score: score + scoreQuestions });
    }
    this.setState({
      disabled: false,
    });
    const returnLS = returnLocalStorage('ranking');
    if (indexCard === lastCard) {
      saveLocalStorage('ranking', [...returnLS, {
        name,
        picture: `https://www.gravatar.com/avatar/${picture}`,
        score,
      }]);
    }
  }

  buttonDisable = () => {
    const { time } = this.props;
    const { buttonClickDisable } = this.state;
    return (time === 0 || buttonClickDisable);
  }

  render() {
    const { shufleArray, card, nextTime, disabled } = this.state;
    console.log(shufleArray);
    const { time } = this.props;
    return (
      <article className="wrap-card">
        {
          time === 0
            ? <strong><h3>TEMPO ESGOTADO</h3></strong>
            : <Timer newTimer={ nextTime } />
        }
        <div className="wrap-category">
          <p
            data-testid="question-category"
          >
            { card.category }
          </p>
        </div>
        <div className="wrap-question-answer">
          <div className="wrap-question">
            { card.correct_answer === 'Dirk the Daring' ? (
              <p data-testid="question-text">
                {card.question}
              </p>)
              : (
                <p
                  data-testid="question-text"
                  dangerouslySetInnerHTML={ { __html: sanitizeHtml(card.question) } }
                />
              )}
          </div>
          <div className="wrap-answer" data-testid="answer-options">
            { shufleArray.map((question) => {
              if (question.dataTest === CORRECT_ANSWER) {
                return (
                  <button
                    data-testid={ CORRECT_ANSWER }
                    id="answer-btn"
                    type="button"
                    value={ question.dataTest }
                    onClick={ this.handleClickQuestions }
                    disabled={ this.buttonDisable() }
                    className={ this.buttonDisable() ? 'correct-btn' : null }
                    dangerouslySetInnerHTML={ { __html: sanitizeHtml(question.answer) } }
                  >
                    {/* { question.answer } */}
                  </button>
                );
              } return (
                <button
                  data-testid={ question.dataTest }
                  id="answer-btn"
                  type="button"
                  key={ question.key }
                  value={ question.dataTest }
                  onClick={ this.handleClickQuestions }
                  disabled={ this.buttonDisable() }
                  className={ this.buttonDisable() ? 'wrong-btn' : null }
                  dangerouslySetInnerHTML={ { __html: sanitizeHtml(question.answer) } }
                >
                  {/* { question.answer } */}
                </button>
              );
            })}
          </div>
        </div>
        <div className="wrap-next-btn">
          {(!disabled || this.buttonDisable()) && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.handleClick }
              className="next-btn"
            >
              Next
            </button>
          )}
        </div>
      </article>
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
