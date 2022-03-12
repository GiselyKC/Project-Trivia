import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CardGame extends Component {
state ={
  shufleArray: [],
  indexCard: 0,
  card: {},
  timer: '',
  disabled: false,
}

componentDidMount() {
  this.setState({
    shufleArray: this.arrayOriginal(),
  }, this.count(duration, display));
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
    }, () => this.setState({
      shufleArray: this.arrayOriginal(),
    }));
  }

  count = (duration, display) => {
    const duration = 30;
    const timer = setInterval(function() {
      // const numberOne = 60;
      // const numberTwo = 0;
      // const numberThree = 1000;

      const second = parseInt(duration, 10) - 1;
      duration = second;

      // secondsTime = seconds < numberTwo ? '0' + seconds : seconds;
      if (second === 0) {
        this.setState({
          disabled: true,
      });

      // display.textContent = '00' + ':' + secondsTime;

      // if (--timer < 0) {
      //   timer = duration;
      // }
    }, 1000);
  };

  render() {
    const { shufleArray, card } = this.state;
    const { count } = this;
    return (
      <div>
        <p>
          Timer:
          { count }
        </p>
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
                >
                  { question.answer }
                </button>);
            } return (
              <button
                data-testid={ question.dataTest }
                type="button"
                key={ question.key }
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
