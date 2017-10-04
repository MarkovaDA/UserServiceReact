import React, { Component } from 'react';
import User from './User';
import UserDetailPopup from './UserDetailPopup';
import LoadMessage from './LoadMessage';
import ErrorMessage from './ErrorMessage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/LoadDataAction';
import userService from '../service/DataLoadService';

import PropTypes from 'prop-types';

class UserList extends Component {
  state = {
    displayData: null
  };

  componentDidMount() {
    this.props.userActions.loadUsersData();
  }

  onClick(userId) {
    //this.props.userActions.loadUserInfoById(userId); implementation with redux
    this.extractUserDataById(userId);
  }

  //извлечь информацию о пользователе по id
  extractUserDataById(id) {
    userService.getUserDataById(id)
      .then((data) => {
        this.setState({
          displayData: data
        });
      }, (error) => {
        console.log('error', error);
      });
  }

  render() {
    const items = this.props.items;//список пользователей
    const error = !!this.props.error;//произошла ли ошибка загрузки
    return (
      <div>
        <LoadMessage isLoading={!this.props.items && !error} />
        <ErrorMessage isError={error}/>
        <div className="user-container">
          {
            items && items.map((item, index) => <User onClick={() => this.onClick(item.id)} user={item} key={index} />)
          }
        </div>
        <UserDetailPopup userInfo={this.props.userInfo} userDetail={this.state.displayData} />
      </div>
    );
  }

}

UserList.propTypes = {
  userInfo: PropTypes.object,
  items: PropTypes.array,
  userActions: PropTypes.objectOf(PropTypes.func)
};

export default connect(
  state => ({
    error: state.usersData.error,
    items: state.usersData.items,
    userInfo: state.selectedUser.info
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(UserList);
