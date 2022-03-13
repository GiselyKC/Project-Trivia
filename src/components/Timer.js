import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TIME_LIMIT = -1;
const ONE_SECOND = 1000;

export default class Timer extends Component {
  state = {
    seconds: 10,
  };

  componentDidMount() {
    this.countDown();
  }

  componentDidUpdate() {
    const { newTimer } = this.props;
    console.log('oi', newTimer);
    const { seconds } = this.state;
    if (seconds === TIME_LIMIT) {
      if (newTimer) this.setState({ seconds: 10 });
      // newTimer > 0 ? return this.setState({
      return this.setState({ seconds: 0 });
    }
  }

  // componentWillUnmount() {
  //   clearInterval(this.intervalId);
  // }

    countDown = () => {
      this.intervalId = setInterval(() => {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }, ONE_SECOND);
    }

    render() {
      const { seconds } = this.state;
      const { newTimer } = this.props;
      return (
        <div>
          <p>
            Timer:
            { seconds }
          </p>
        </div>
      );
    }
}

Timer.propTypes = {
  newTimer: PropTypes.number.isRequired,
};
