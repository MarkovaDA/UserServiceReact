import React, { Component } from 'react';
import User from './User';
import FancyBox from './FancyBox';
import { connect } from 'react-redux';
import { CallPopupAction } from "../actions/CallPopupAction"
import find from 'lodash/find';
import omit from 'lodash/omit';

class UserList extends Component {
  state = {
      items: [],//список всех пользователей
      selectedItem: null
  };

  componentDidMount() {
    //загружаем пользователей, подлежащих отображению
    this.getUsers();
  }

  render() {
    return (
      <div>
        <div className = "user-container">
          {
            this.state.items.map((item, index) => <User onClick={() => this.onClick(item.id)} user={item} key={index} />)
          }
        </div>
        <FancyBox userInfo = {this.state.selectedItem}/>
      </div>
    );
  }

  onClick(userId) {
    this.getUserById(userId);
  }

  //получаем список пользователей
  getUsers() { // Вынести в action
    fetch('/server/users.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({items: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
    ;
  }

  //получаем информацию о пользователе по id
  getUserById(id) {
    fetch('/server/description.json')
      .then((response) => response.json())
      .then((responseJson) => {
        const itemInfo = omit(find(responseJson, {'id': id}), 'id');
        this.setState({selectedItem: itemInfo});
        //this.props.loadItemDescription(itemInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default connect(
  state => ({
    clickedItem: state.item
  }),

  dispatch => ({
    loadItemDescription: (info) => {
      dispatch(CallPopupAction(info));
    }
  })
)(UserList);