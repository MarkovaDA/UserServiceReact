import React, { Component } from 'react';
import User from './User';
import FancyBox from './FancyBox';
import { connect } from 'react-redux';
import { loadUsersDataAction} from "../actions/LoadDataAction";
import { loadUserInfoByIdAction } from "../actions/LoadDataAction";
import PropTypes from 'prop-types';

class UserList extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    if (!this.props.items)
      return (
        <div>
          <p>Ошибка загрузки данных</p>
        </div>
      );
    else return (
      <div>
        <div className = "user-container">
          {
            this.props.items.map((item, index) => <User onClick={() => this.onClick(item.id)} user={item} key={index} />)
          }
        </div>
        <FancyBox userInfo = {this.props.userInfo} />
      </div>
    );
  }

  onClick(userId) {
    this.props.getUserById(userId);
  }

}

export default connect(
  state => ({
    items: state.data.items,
    userInfo: state.data.userInfo
  }),
  dispatch => ({
    loadData: () => {
      dispatch(loadUsersDataAction());
    },
    getUserById: (id) => {
      dispatch(loadUserInfoByIdAction(id));
    }
  })
)(UserList);

UserList.propTypes = {
  userInfo: PropTypes.object,
  items: PropTypes.array
};