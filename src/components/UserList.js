import React, { Component } from 'react';
import User from './User';
import UserDetailPopup from './UserDetailPopup';
import LoadMessage from './LoadMessage';
import ErrorMessage from './ErrorMessage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/LoadDataAction';
import userService from '../service/DataLoadService';
import usersDetailsSchema from '../schema/UserDetailSchema';
import { normalize } from 'normalizr';

import PropTypes from 'prop-types';

class UserList extends Component {
  state = {
    displayData: null
  };

  componentDidMount() {
    userService.getTotalDescription()
      .then(data => {
        //normalize(data, usersDetailsSchema);
        console.log(normalize(data, usersDetailsSchema));
      })
      .catch(error => {console.log(error)});
    //загружаем информацию о пользователях
    this.props.userActions.loadUsersData();
  }

  componentWillReceiveProps(props) {

  }

  onClick(userId) {
    //this.props.userActions.loadUserInfoById(userId); implementation with redux
    this.extractUserDataById(userId);
  }

  //извлечь информацию о пользователе по id
  extractUserDataById(id) {
    this.props.userActions.loadUserDataIsNeed(id);
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
            items && items.map((item, index) => <User onClick={() => this.onClick(item.workplace)} user={item} key={index} />)
          }
        </div>
        <UserDetailPopup userInfo={this.props.clickedUserInfo} userDetail={this.props.clickedUserInfo} />
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
    clickedUserInfo: state.selectedUser.clickedUserInfo
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(UserList);
