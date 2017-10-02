import React, { Component } from 'react';
import User from './User';
import FancyBox from './FancyBox';
import { connect } from 'react-redux';
import { LoadDataAction } from "../actions/LoadDataAction";
import find from 'lodash/find';
import omit from 'lodash/omit';

class UserList extends Component {
  state = {
      selectedItem: null
  };

  componentDidMount() {
    this.props.loadData();
  }

  componentWillReceiveProps(props) {
    console.log('состояние хранилища', props.storage);
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
        <FancyBox userInfo = {this.state.selectedItem}/>
      </div>
    );
  }

  onClick(userId) {
    this.getUserById(userId);
  }

  //получаем информацию о пользователе по id
  getUserById(id) {
    fetch('/server/description.json')
      .then((response) => response.json())
      .then((responseJson) => {
        const itemInfo = omit(find(responseJson, {'id': id}), 'id');
        this.setState({selectedItem: itemInfo});
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default connect(
  state => ({
    storage: state,
    items: state.data.items,
  }),
  dispatch => ({
    //загружаем пользователей с сервера
    loadData: () => {
      dispatch(LoadDataAction());
    }
  })
)(UserList);

/*return {
  ...state,
  items: [
    {"id":1, "firstname": "Сергей", "lastname": "Шарапов"},
    {"id":2, "firstname": "Юрий", "lastname": "Анисимов"},
    {"id":3, "firstname": "Павел", "lastname": "Никонов"},
    {"id":4, "firstname": "Богдан", "lastname": "Шашков"},
    {"id":5, "firstname": "Игорь", "lastname": "Осипов"},
    {"id":6, "firstname": "Дарья", "lastname": "Маркова"}
  ]
};*/