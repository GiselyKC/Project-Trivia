import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Timer from './Timer';

export default class CardGame extends Component {
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

  arrayOriginal = () => {
    const { indexCard } = this.state;
    const { results } = this.props;
    console.log(results);
    const card = results[indexCard];
    console.log(card);
    this.setState({
      card,
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
    this.setState({
      indexCard: indexCard + 1,
      nextTime: true,
    }, () => this.setState({
      shufleArray: this.arrayOriginal(),
    }));
  }

  render() {
    const { shufleArray, card, disabled, nextTime } = this.state;
    return (
      <div>
        <h1>CardGame</h1>
        <Timer newTimer={ nextTime } />
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
                  disabled={ disabled }
                >
                  { question.answer }
                </button>);
            } return (
              <div key={ question.key }>
                <button
                  data-testid={ question.dataTest }
                  type="button"
                  disabled={ disabled }
                >
                  { question.answer }
                </button>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={ this.handleClick }> Próximo</button>
      </div>
    );
  }
}

CardGame.propTypes = {
  results: PropTypes.arrayOf.isRequired,
};
