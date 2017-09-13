import React, { Component } from 'react';

class User extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const imgSrc = require('../images/user_icon.png');

    return (
      <div className = "ui middle aligned large divided animated selection list">
        <div className = "item">
          <img className = "ui avatar image" src={imgSrc} />
          <div className = "content">
            <a className = "description">{this.props.user.firstname} {this.props.user.lastname}</a>
          </div>
        </div>
      </div>
    );
  }
}
export default User;