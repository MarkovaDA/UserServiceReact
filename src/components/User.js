import React from 'react';
import { connect } from 'react-redux';
import { ItemClickAction } from '../actions/ItemClickAction';


class User extends React.Component {

  render() {
    const imgSrc = require('../images/user_icon.png');

    return (
      <div className = "ui middle aligned large divided animated selection list"
           onClick={this.showItemDescription.bind(this)}>

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

  showItemDescription() {
    this.props.onItemClick(this.props.user.id);
  }
}

export default connect (
  state => ({}),

  dispatch => ({
    onItemClick: (id) => {
      //оповещаем UserList о клике на дочернем компоненте User
      dispatch(ItemClickAction(id));
    }
  })
)(User);