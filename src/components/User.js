import React from 'react';
import PropTypes from 'prop-types';

class User extends React.Component {

  render() {
    const imgSrc = require('../images/user_icon.png');

    return (
      <div className = "ui middle aligned large divided animated selection list"
           onClick={this.props.onClick}>

        <div className = "item">
          <img className = "ui avatar image" src={imgSrc} alt="user specified icon"/>
          <div className = "content">
            <a className = "description">
              {this.props.user.firstname} {this.props.user.lastname}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default User;

User.propTypes = {
  user: PropTypes.shape({
    firstname:PropTypes.string,
    lastname:PropTypes.string
  })
};