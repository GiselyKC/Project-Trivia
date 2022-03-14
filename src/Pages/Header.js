import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
// import { returnLocalStorage } from '../utils/localStorage';

class Header extends Component {
  queryGravatar = () => {
    const { email } = this.props;
    const convertedEmail = md5(email).toString();
    return `https://www.gravatar.com/avatar/${convertedEmail}`;
  }

  render() {
    const { name, scoreGame } = this.props;
    return (
      <div>
        <img
          src={ this.queryGravatar() }
          alt="user"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{ scoreGame }</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scoreGame: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  scoreGame: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
