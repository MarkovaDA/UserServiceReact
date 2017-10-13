import React, { Component } from 'react';
import User from './User';
import UserDetailPopup from './UserDetailPopup';
import GroupFilter from './GroupFilter';
import LoadMessage from './LoadMessage';
import ErrorMessage from './ErrorMessage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/LoadDataAction';
import { isEmpty } from 'lodash';


import PropTypes from 'prop-types';

class UserList extends Component {
  state = {
    clickedUser: null
  };

  componentDidMount() {
    //загружаем информацию о пользователях
    this.props.userActions.loadUsersData();
  }

  onClick(userId) {
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
      <div className="ui center container">
        <div className="ui secondary pointing menu">
          <a className="ui active yellow item">
            <GroupFilter />
          </a>
        </div>
        <div className="ui segment">
          <div>
            <LoadMessage isLoading={!this.props.items && !error} />
            <ErrorMessage isError={error} />
            <div className="user-container">
              {
                items && items.map((item, index) => <User onClick={() => this.onClick(item.id)} user={item} key={index} />)
              }
            </div>
            <UserDetailPopup userDetail={this.props.clickedUserInfo} />
          </div>
        </div>
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
