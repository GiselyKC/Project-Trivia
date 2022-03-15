import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTime } from '../Redux/actions';

const TIME_LIMIT = -1;
const ONE_SECOND = 1000;

class Timer extends Component {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    this.countDown();
  }

  stateUptade = () => {
    const { seconds } = this.state;
    const { newTimer, dispatch } = this.props;
    if (seconds === 0) {
      dispatch(setTime(0));
      clearInterval(this.intervalId);
    }
    if (newTimer) this.setState({ seconds: 30 }, () => {});
    if (seconds === TIME_LIMIT) {
      return this.setState({ seconds: 0 });
    }
  }

    countDown = () => {
      this.intervalId = setInterval(() => {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }, ONE_SECOND);
    }

    render() {
      const { seconds } = this.state;
      this.stateUptade();
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
  dispatch: PropTypes.func.isRequired,
  newTimer: PropTypes.number.isRequired,
};

export default connect()(Timer);
