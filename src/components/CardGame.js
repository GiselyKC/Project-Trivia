import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CardGame extends Component {
state = {
  shufleArray: [],
  indexCard: 0,
  card: {},
  resultQuestion: '',
  score: 0,
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
    // console.log(card);
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
    }, () => this.setState({
      shufleArray: this.arrayOriginal(),
    }));
  }

  handleClickQuestions = ({ target: { value } }) => {
    const { score, card: { difficulty } } = this.state;
    const timer = 10;
    const NUMBER = 10;
    const easyNumber = 1;
    const mediumNumber = 2;
    const hardNumber = 3;
    if (value === 'correct-answer' && difficulty === 'easy') {
      const scoreQuestions = NUMBER + (timer * easyNumber);
      this.setState({ score: score + scoreQuestions });
    } if (value === 'correct-answer' && difficulty === 'medium') {
      const scoreQuestions = NUMBER + (timer * mediumNumber);
      this.setState({ score: score + scoreQuestions });
    } if (value === 'correct-answer' && difficulty === 'hard') {
      const scoreQuestions = NUMBER + (timer * hardNumber);
      this.setState({ score: score + scoreQuestions });
    }
    this.setState({
      resultQuestion: value,
    });
  }

  render() {
    const { shufleArray, card } = this.state;
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
          { shufleArray.map((question) => {
            if (question.dataTest === 'correct_answer') {
              return (
                <button
                  data-testid="correct-answer"
                  type="button"
                  value={ question.dataTest }
                  onClick={ this.handleClickQuestions }
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
  results: PropTypes.arrayOf.isRequired,
};
