import React, { Component } from 'react';
import User from './User';
import UserDetailPopup from './UserDetailPopup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from "../actions/LoadDataAction";

import PropTypes from 'prop-types';

class UserList extends Component {
  componentDidMount() {
    this.props.userActions.loadUsersData();
  }

  render() {
    if (!this.props.items) {
      return (
        <div>
          <p>Загрузка данных...</p>
        </div>
      );
    }

    return (
      <div>
        <div className="user-container">
          {
            this.props.items.map((item, index) => <User onClick={() => this.onClick(item.id)} user={item} key={index} />)
          }
        </div>
        <UserDetailPopup userInfo={this.props.userInfo} />
      </div>
    );
  }

  onClick(userId) {
    this.props.userActions.loadUserInfoById(userId);
  }
}

UserList.propTypes = {
  userInfo: PropTypes.object,
  items: PropTypes.array,
  userActions: PropTypes.objectOf(PropTypes.func)
};

export default connect(
  state => ({
    items: state.usersData.items,
    userInfo: state.selectedUser.info
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
    /*loadData: () => {
      dispatch(loadUsersData());
    },
    getUserById: (id) => {
      dispatch(loadUserInfoById(id));
    }*/
  })
)(UserList);
