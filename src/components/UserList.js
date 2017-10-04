import React, { Component } from 'react';
import User from './User';
import UserDetailPopup from './UserDetailPopup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from "../actions/LoadDataAction";

import PropTypes from 'prop-types';

class UserList extends Component {
  state = {
    displayData: null
  };

  componentDidMount() {
    this.props.userActions.loadUsersData();
  }
  componentWillReceiveProps(props) {
    //console.log(props.usersData.error);
    console.log(props.error);
  }

  onClick(userId) {
    //this.props.userActions.loadUserInfoById(userId); implementation with redux
    this.extractUserDataById(userId);
  }

  //извлечь информацию о пользователе по id
  extractUserDataById(id) {
    fetch('/server/description.json')
      .then(response => response.json())
      .then(json => {
        const data = json.filter(item => item.id === id).shift();
        this.setState({
          displayData: data
        });
      })
      .catch(error => console.log(error))
  }

  render() {
    const loadMessage = <p>Загрузка данных...</p>;
    const errorMessage = <p>Ошибка получения данных о пользователях</p>;

    if (this.props.error)
      return (
        errorMessage
      )
    if (!this.props.items && !this.props.error) {
      return (
        loadMessage
      );
    }

    return (
      <div>
        <div className="user-container">
          {
            this.props.items.map((item, index) => <User onClick={() => this.onClick(item.id)} user={item} key={index} />)
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
    /*loadData: () => {
      dispatch(loadUsersData());
    },
    getUserById: (id) => {
      dispatch(loadUserInfoById(id));
    }*/
  })
)(UserList);
