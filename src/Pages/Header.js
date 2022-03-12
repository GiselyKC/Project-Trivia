import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  queryGravatar = () => {
    const { email } = this.props;
    const convertedEmail = md5(email).toString();
    return `https://www.gravatar.com/avatar/${convertedEmail}`;
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <img
          src={ this.queryGravatar() }
          alt="user"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
