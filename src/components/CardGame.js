import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CardGame extends Component {
  render() {
    const { card } = this.props;
    return (
      <div>
        <h1>CardGame</h1>
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
          <button
            data-testid="correct-answer"
            type="button"
          >
            { card.correct_answer }
          </button>
          {
            card.incorrect_answers.map((incorrect, index) => (
              <button
                data-testid={ `wrong-answer-${index}` }
                type="button"
                key={ index }
              >
                { incorrect }
              </button>
            ))
          }
        </div>
        <button
          type="button"
        >
          Próximo
        </button>
      </div>
    );
  }
}

CardGame.propTypes = {
  card: PropTypes.objectOf.isRequired,
};
